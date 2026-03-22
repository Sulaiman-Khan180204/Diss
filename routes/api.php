<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CatalogController;

Route::get('/need-groups', [CatalogController::class, 'needGroups']);      // header + homepage “Products by Need”
Route::get('/need-groups/{slug}', [CatalogController::class, 'needGroup']); // single need group + its conditions
Route::get('/products', [CatalogController::class, 'allProducts']);        // all products listing
Route::get('/products/{slug}', [CatalogController::class, 'product']);     // product details page
Route::get('/search', [CatalogController::class, 'search']);               // search results
Route::get('/conditions/{slug}', [CatalogController::class, 'condition']);  // products under a condition