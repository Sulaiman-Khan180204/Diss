<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Models\Product;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function index(Request $request)
    {
        $slugs = $request->user()
            ->favourites()
            ->with('product:id,slug')
            ->get()
            ->pluck('product.slug')
            ->filter()
            ->values();

        return response()->json(['slugs' => $slugs]);
    }

    public function favouriteProducts(Request $request)
    {
        $products = $request->user()
            ->favourites()
            ->with(['product.conditions.needGroup', 'product.ingredients', 'product.compounds'])
            ->get()
            ->pluck('product')
            ->filter()
            ->values();

        return response()->json($products);
    }

    public function toggle(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $userId  = $request->user()->id;

        $existing = Favourite::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['favourited' => false]);
        }

        Favourite::create(['user_id' => $userId, 'product_id' => $product->id]);
        return response()->json(['favourited' => true]);
    }
}
