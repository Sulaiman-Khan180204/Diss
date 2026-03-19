<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CatalogController;

Route::get('/need-groups', [CatalogController::class, 'needGroups']);     // header + homepage “Products by Need”
Route::get('/search', [CatalogController::class, 'search']);              // search results (products + conditions + ingredients)
Route::get('/products/{slug}', [CatalogController::class, 'product']);    // product details page
Route::get('/conditions/{slug}', [CatalogController::class, 'condition']); // products under a condition (sorted by relevance)