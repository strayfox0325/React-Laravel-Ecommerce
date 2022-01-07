<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
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
//User Routes
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('logout',[AuthController::class,'logout']);
//Category Routes
Route::get('show-category',[CategoryController::class,'index']);
Route::get('all-category',[CategoryController::class,'showAll']);
Route::post('add-category',[CategoryController::class,'store']);
Route::get('edit-category/{id}',[CategoryController::class,'edit']);
Route::put('update-category/{id}',[CategoryController::class,'update']);
Route::delete('delete-category/{id}',[CategoryController::class,'destroy']);
//product Routes
Route::get('show-product',[ProductController::class,'index']);
Route::post('add-product',[ProductController::class,'store']);
Route::get('edit-product/{id}',[ProductController::class,'edit']);
Route::put('update-product/{id}',[ProductController::class,'update']);
Route::delete('delete-product/{id}',[ProductController::class,'destroy']);


 Route::middleware('auth:api')->get('/user', function (Request $request) {
     return $request->user();
 });