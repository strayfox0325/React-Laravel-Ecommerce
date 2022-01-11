<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    public function add(Request $request){

        if(auth('sanctum')->check()){

            $user_id=auth('sanctum')->user()->id;
            $product_id=$request->product_id;
            $product_qty=$request->product_qty;
            $productCheck=Product::where('id',$product_id)->first();

            
            if($productCheck)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$productCheck->name.' already added to cart',
                    ]);

                }
                else{

                    $cartItem=new Cart;
                    $cartItem->user_id=$user_id;
                    $cartItem->product_id=$product_id;
                    $cartItem->product_qty=$product_qty;
                    $cartItem->save();
                    return response()->json([
                        'status'=>201,
                        'message'=>'Added to Cart',
                    ]);

                }
           }else{
            return response()->json([
                'status'=>404,
                'message'=>'Product Not Found',
            ]);
           }
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'You must log in to add to cart',
            ]);
        }
    }
}
