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



}
