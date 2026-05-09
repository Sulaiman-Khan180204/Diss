<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\FavouriteController;

Route::get('/need-groups', [CatalogController::class, 'needGroups']);      // header + homepage “Products by Need”
Route::get('/need-groups/{slug}', [CatalogController::class, 'needGroup']); // single need group + its conditions
Route::get('/products', [CatalogController::class, 'allProducts']);        // all products listing
Route::get('/products/{slug}', [CatalogController::class, 'product']);     // product details page
Route::get('/search', [CatalogController::class, 'search']);               // search results
Route::get('/conditions/{slug}', [CatalogController::class, 'condition']);  // products under a condition
Route::get('/compounds', [CatalogController::class, 'compounds']);            // compound explorer list
Route::get('/compounds/{slug}', [CatalogController::class, 'compound']);      // compound explorer detail
Route::get('/ingredients', [CatalogController::class, 'ingredients']);        // ingredient explorer list (legacy)
Route::get('/ingredients/{slug}', [CatalogController::class, 'ingredient']); // ingredient explorer detail (legacy)

// Auth routes (guest)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::post('/auth/logout',   [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected routes (require login)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::get('/profile',      [ProfileController::class, 'show']);
    Route::post('/profile',     [ProfileController::class, 'save']);
    Route::get('/favourites',         [FavouriteController::class, 'index']);
    Route::get('/favourites/products',[FavouriteController::class, 'favouriteProducts']);
    Route::post('/favourites/{slug}', [FavouriteController::class, 'toggle']);
});