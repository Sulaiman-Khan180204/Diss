<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{NeedGroup, Product, Ingredient, Condition};
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    /**
     * For header + homepage: list groups and their conditions.
     */
    public function needGroups()
    {
        $groups = NeedGroup::with(['conditions:id,need_group_id,name,slug'])
            ->orderBy('order')
            ->get(['id','name','slug','order']);

        return response()->json($groups);
    }

    /**
     * Single need group with its conditions.
     */
    public function needGroup(string $slug)
    {
        $group = NeedGroup::with(['conditions:id,need_group_id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail(['id','name','slug','order']);

        return response()->json($group);
    }

    /**
     * All products listing.
     */
    public function allProducts()
    {
        $products = Product::orderBy('name')
            ->get(['id','name','slug','image_url','form','description']);

        return response()->json($products);
    }

    /**
     * Search across products/conditions/ingredients.
     * Returns enriched product objects with their conditions and ingredients.
     */
    public function search(Request $req)
    {
        $q = trim((string) $req->query('q', ''));

        if ($q === '') {
            return response()->json([
                'products'    => [],
                'conditions'  => [],
                'ingredients' => [],
            ]);
        }

        // Base: direct product name match
        $products = Product::with([
                'conditions:id,name,slug',
                'ingredients:id,name,short_benefits,evidence_level'
            ])
            ->where('name', 'like', "%{$q}%")
            ->limit(12)
            ->get(['id','name','slug','image_url','form','description']);

        // Ingredient + Condition matches (to widen results)
        $ingredients = Ingredient::where('name','like',"%{$q}%")
            ->limit(10)->get(['id','name']);

        $conditions = Condition::where('name','like',"%{$q}%")
            ->limit(10)->get(['id','name','slug']);

        // If user typed an ingredient, include products containing it
        if ($ingredients->isNotEmpty()) {
            $ingredientIds = $ingredients->pluck('id');
            $byIngredient = Product::with([
                    'conditions:id,name,slug',
                    'ingredients:id,name,short_benefits,evidence_level'
                ])
                ->whereHas('ingredients', fn($qq) => $qq->whereIn('ingredients.id', $ingredientIds))
                ->limit(12)
                ->get(['id','name','slug','image_url','form','description']);

            $products = $products->merge($byIngredient)->unique('id')->values();
        }

        // If user typed a condition, include products mapped to it (sorted by relevance)
        if ($conditions->isNotEmpty()) {
            $conditionIds = $conditions->pluck('id');
            $byCondition = Product::with([
                    'conditions:id,name,slug',
                    'ingredients:id,name,short_benefits,evidence_level'
                ])
                ->whereHas('conditions', fn($qq) => $qq->whereIn('conditions.id', $conditionIds))
                ->limit(12)
                ->get(['id','name','slug','image_url','form','description']);

            $products = $products->merge($byCondition)->unique('id')->values();
        }

        return response()->json([
            'products'    => $products,
            'conditions'  => $conditions,
            'ingredients' => $ingredients
        ]);
    }

    /**
     * Full product page: includes mapped conditions and ingredients.
     */
    public function product(string $slug)
    {
        $product = Product::with([
                'conditions:id,name,slug',
                'ingredients:id,name,short_benefits,evidence_level'
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($product);
    }

    /**
     * Condition landing: list products for a condition, sorted by relevance.
     */
    public function condition(string $slug)
    {
        $condition = Condition::where('slug', $slug)->firstOrFail();

        $products = $condition->products()
            ->with(['ingredients:id,name,short_benefits,evidence_level', 'conditions:id,name,slug'])
            ->orderByDesc('product_conditions.relevance_score') // pivot column
            ->get(['products.id','products.name','products.slug','products.image_url','products.form','products.description']);

        return response()->json([
            'condition' => $condition->only(['id','name','slug']),
            'products'  => $products,
        ]);
    }
}