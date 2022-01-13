<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\Cart;

class CheckoutController extends Controller
{
    public function validateorder(Request $request){
        $validator=Validator::make($request->all(),[
            'forname'=>'required|max:255',
            'surname'=>'required|max:255',
            'phone'=>'required|max:255',
            'email'=>'required|max:255',
            'address'=>'required|max:255',
            'city'=>'required|max:255',
            'zip'=>'required|max:255',
            'country'=>'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            return response()->json([
                'status'=>200,
                'message'=>'Form Validated Successfully',
            ]);
        }
    }


    public function placeorder(Request $request){
        $validator=Validator::make($request->all(),[
            'forname'=>'required|max:255',
            'surname'=>'required|max:255',
            'phone'=>'required|max:255',
            'email'=>'required|max:255',
            'address'=>'required|max:255',
            'city'=>'required|max:255',
            'zip'=>'required|max:255',
            'country'=>'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{

            $order=new Order;
            $order->forname=$request->forname;
            $order->surname=$request->surname;
            $order->phone=$request->phone;
            $order->email=$request->email;
            $order->address=$request->address;
            $order->city=$request->city;
            $order->zip=$request->zip;
            $order->country=$request->country;
            //$order->payment_id=$request->payment_id;
            $order->payment_mode=$request->payment_mode;
            $order->payment_id=$request->payment_id;
            $order->tracking_no=rand(1111,9999).'RS';
            $order->save();

            $cart=Cart::all();
            
            $orderitems=[];
            foreach($cart as $item){
                $orderitems=[
                    'product_id'=>$item->product_id,
                    'qty'=>$item->product_qty,
                    'price'=>$item->product->selling_price,
                ];
                $item->product->update([
                    'qty'=>$item->product->qty-$item->product_qty
                ]);
            }
            $order->orderitems()->createMany($orderitems);
            Cart::destroy($cart);


            return response()->json([
                'status'=>200,
                'message'=>'Order Placed Successfully',
            ]);
        }
    }
}
