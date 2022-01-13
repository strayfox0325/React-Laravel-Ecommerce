<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Auth Routes
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('logout',[AuthController::class,'logout']);

//User Category Routes
Route::get('get-category',[FrontendController::class,'category']);
//User Product Routes
Route::get('get-product/{slug}',[FrontendController::class,'product']);
Route::get('view-product/{category_slug}/{product_slug}',[FrontendController::class,'viewProduct']);
//User Cart Routes
Route::post('add-to-cart',[CartController::class,'add']);
Route::get('cart',[CartController::class,'index']);
Route::put('cart-update/{cart_id}/{scope}',[CartController::class,'update']);
Route::delete('delete-cartitem/{cart_id}',[CartController::class,'delete']);
//User Checkout Routes
Route::post('validate-order',[CheckoutController::class,'validateorder']);
Route::post('place-order',[CheckoutController::class,'placeorder']);

//Admin Category Routes
Route::get('show-category',[CategoryController::class,'index']);
Route::get('all-category',[CategoryController::class,'showAll']);
Route::post('add-category',[CategoryController::class,'store']);
Route::get('edit-category/{id}',[CategoryController::class,'edit']);
Route::put('update-category/{id}',[CategoryController::class,'update']);
Route::delete('delete-category/{id}',[CategoryController::class,'destroy']);
//Admin Product Routes
Route::get('show-product',[ProductController::class,'index']);
Route::post('add-product',[ProductController::class,'store']);
Route::get('edit-product/{id}',[ProductController::class,'edit']);
Route::post('update-product/{id}',[ProductController::class,'update']);
Route::delete('delete-product/{id}',[ProductController::class,'destroy']);
//Admin Order Routes
Route::get('admin/orders',[OrderController::class,'index']);



 Route::middleware('auth:api')->get('/user', function (Request $request) {
     return $request->user();
 });