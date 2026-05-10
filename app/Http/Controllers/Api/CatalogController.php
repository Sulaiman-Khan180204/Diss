<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{NeedGroup, Product, Ingredient, Condition, Compound};
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
     * Single need group with its conditions and all associated products.
     */
    public function needGroup(string $slug)
    {
        $group = NeedGroup::with(['conditions:id,need_group_id,name,slug'])
            ->where('slug', $slug)
            ->firstOrFail(['id','name','slug','order']);

        $conditionIds = $group->conditions->pluck('id');

        $products = Product::whereHas('conditions', fn($q) => $q->whereIn('conditions.id', $conditionIds))
            ->with(['conditions:id,name,slug'])
            ->orderBy('name')
            ->get(['id','name','slug','image_url','form','description']);

        return response()->json([
            'group'    => $group,
            'products' => $products,
        ]);
    }

    /**
     * All products listing — includes ingredients and conditions (with need group) for client-side filtering.
     */
    public function allProducts()
    {
        $products = Product::with([
                'ingredients:id,name',
                'conditions:id,name,slug,need_group_id',
                'conditions.needGroup:id,name,slug,order',
            ])
            ->orderBy('name')
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
                'ingredients:id,name,short_benefits,evidence_level',
                'compounds:id,name,slug,description,mechanism',
            ])
            ->where('slug', $slug)
            ->firstOrFail(['id','name','slug','form','description','image_url',
                           'suitable_age','vegan_friendly','pregnancy_safe','children_safe']);

        return response()->json($product);
    }

    /**
     * Compound Explorer list — all compounds with their category and associated products.
     */
    public function compounds()
    {
        $compounds = Compound::with(['products:id,name,slug,image_url'])
            ->orderBy('category')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'category', 'description', 'ingredient_id']);

        return response()->json($compounds);
    }

    /**
     * Compound Explorer detail — mechanism, parent ingredient, and products.
     */
    public function compound(string $slug)
    {
        $compound = Compound::with([
                'products:id,name,slug,image_url,form',
                'ingredient:id,name',
            ])
            ->where('slug', $slug)
            ->firstOrFail(['id', 'name', 'slug', 'category', 'description', 'mechanism', 'ingredient_id']);

        return response()->json($compound);
    }

    /**
     * Ingredient Explorer list — all ingredients with their compound count.
     */
    public function ingredients()
    {
        $ingredients = Ingredient::withCount('compounds')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'short_benefits', 'evidence_level']);

        return response()->json($ingredients);
    }

    /**
     * Ingredient Explorer detail — compounds and products containing this ingredient.
     */
    public function ingredient(string $slug)
    {
        $ingredient = Ingredient::with([
                'compounds:id,name,description,mechanism,ingredient_id',
                'products:id,name,slug,image_url,form',
            ])
            ->where('slug', $slug)
            ->firstOrFail(['id', 'name', 'slug', 'short_benefits', 'evidence_level']);

        return response()->json($ingredient);
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