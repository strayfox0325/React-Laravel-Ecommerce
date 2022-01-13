<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    public function index(){
        
        //$user_id=auth('sanctum')->user()->id;
        $cartItems=Cart::all();
        return response()->json([
            'status'=>200,
            'cart'=>$cartItems,
        ]);
    }
    public function add(Request $request){


            //$user_id=auth('sanctum')->user()->id;
            $product_id=$request->product_id;
            $product_qty=$request->product_qty;
            $productCheck=Product::where('id',$product_id)->first();

            
            if($productCheck)
            {
                if(Cart::where('product_id',$product_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$productCheck->name.' already added to cart',
                    ]);

                }
                else{

                    $cartItem=new Cart;
                    //$cartItem->user_id=$user_id;
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
    }

    public function update($cart_id,$scope){
        $cartItem=Cart::where('id',$cart_id)->first();
        if($scope=="inc"){
            $cartItem->product_qty+=1;
        }else if($scope=="dec"){
            $cartItem->product_qty-=1;
        }
        $cartItem->update();
        return response()->json([
            'status'=>200,
            'message'=>'Cart Updated',
        ]);
    }
    public function delete($cart_id){
        $cartItem=Cart::where('id',$cart_id)->first();
        if($cartItem){
            $cartItem->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Cart Item Removed',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Cart Item Not Found',
            ]);
        }
    }
}
