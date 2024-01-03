<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\productController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\salesItemController;
use App\Http\Controllers\salesController;
use App\Http\Controllers\customerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/admin/login', [authController::class, 'loginAdmin']);
Route::get('/productAll', [productController::class, 'getProductAll']);
Route::get('/product/{id}', [productController::class, 'getProductById']);
Route::post('/product/{id}', [productController::class, 'updateProduct']);
Route::post('/product', [productController::class, 'store']);
Route::delete('/product/{id}', [productController::class, 'destroy']);
Route::get('/product', [productController::class, 'getProduct']);
Route::get('/product-parent', [productController::class, 'searchProduct']);
Route::get('/product-parent/{id}', [productController::class, 'getProductByIdParent']);


Route::get('/category', [categoryController::class, 'getCategory']);
Route::post('/category', [categoryController::class, 'store']);
Route::get('/category/{id}', [categoryController::class, 'getCategoryById']);
Route::put('/category/{id}', [categoryController::class, 'updateCategory']);
Route::delete('/category/{id}', [categoryController::class, 'deleteCategory']);


Route::post('/salesItems', [salesItemController::class, 'createSalesItem']);

Route::put('/sales/{id}', [salesController::class, 'updateSales']);

Route::put('/customer/{id}', [customerController::class, 'updateCustomer']);
