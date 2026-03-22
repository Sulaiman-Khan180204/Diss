<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\{NeedGroup, Condition, Product, Ingredient};

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $dir = database_path('data');

        // 1) Need Groups
        foreach ($this->csv("$dir/need_groups.csv") as $row) {
            NeedGroup::updateOrCreate(
                ['slug' => $row['slug']],
                ['name' => $row['name'], 'order' => (int)($row['order'] ?? 1)]
            );
        }

        // 2) Conditions (attach to groups)
        foreach ($this->csv("$dir/conditions.csv") as $row) {
            $group = NeedGroup::where('slug', $row['need_group_slug'])->firstOrFail();

            Condition::updateOrCreate(
                ['slug' => $row['slug']],
                ['name' => $row['name'], 'need_group_id' => $group->id]
            );
        }

        // 3) Ingredients (optional but recommended)
        foreach ($this->csv("$dir/ingredients.csv") as $row) {
            Ingredient::updateOrCreate(
                ['name' => $row['name']],
                [
                    'short_benefits' => $row['short_benefits'] ?? null,
                    'evidence_level' => $row['evidence_level'] ?? null,
                ]
            );
        }

        // 4) Products
        foreach ($this->csv("$dir/products.csv") as $row) {
            $slug = $row['slug'] ?: Str::slug($row['name']);
            Product::updateOrCreate(
                ['slug' => $slug],
                [
                    'name'        => $row['name'],
                    'form'        => $row['form'] ?? null,
                    'description' => $row['description'] ?? null,
                    'image_url'   => $row['image_url'] ?? null,
                ]
            );
        }

        // 5) Product -> Conditions pivot
        foreach ($this->csv("$dir/product_conditions.csv") as $row) {
            $product   = Product::where('slug', $row['product_slug'])->first();
            $condition = Condition::where('slug', $row['condition_slug'])->first();

            if ($product && $condition) {
                $product->conditions()->syncWithoutDetaching([
                    $condition->id => ['relevance_score' => (int)($row['relevance_score'] ?? 50)]
                ]);
            }
        }

        // 6) Product -> Ingredients pivot
        foreach ($this->csv("$dir/product_ingredients.csv") as $row) {
            $product    = Product::where('slug', $row['product_slug'])->first();
            $ingredient = Ingredient::where('name', $row['ingredient_name'])->first();

            if ($product && $ingredient) {
                $pivotData = [];
                if (isset($row['amount_mg']) && $row['amount_mg'] !== '') {
                    $pivotData['amount_mg'] = (float) $row['amount_mg'];
                }
                if (isset($row['form_note']) && $row['form_note'] !== '') {
                    $pivotData['form_note'] = $row['form_note'];
                }

                $product->ingredients()->syncWithoutDetaching([
                    $ingredient->id => $pivotData
                ]);
            }
        }
    }

    private function csv(string $file): array
    {
        if (!file_exists($file)) return [];
        $rows = array_map('str_getcsv', file($file));
        $header = array_map(fn($h) => trim($h), array_shift($rows));

        $rows = array_filter($rows, fn($row) => count($row) > 1 || (count($row) === 1 && trim($row[0]) !== ''));

        return array_values(array_map(function ($row) use ($header) {
            // pad short rows and truncate long rows so array_combine doesn't fail
            $row = array_slice(array_pad($row, count($header), null), 0, count($header));
            return array_combine($header, array_map('trim', $row));
        }, $rows));
    }
}