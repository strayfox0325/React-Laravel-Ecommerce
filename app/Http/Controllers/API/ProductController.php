<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    
    public function index(){
        $product=Product::all();
        return response()->json([
            'status'=>200,
            'product'=>$product,
        ]);
    }


    public function edit($id){
        $product=Product::find($id);
        if($product){
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Product not found',
            ]);
        }
    }


    public function update(Request $request,$id){
        $validator=Validator::make($request->all(),[
            'slug'=>'required|max:255',
            'name'=>'required|max:255',
        ]);
        if($validator->fails()){
            
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            $product=Product::find($id);
            if($product){
                $product->meta_keyword=$request->input('meta_keyword');
                $product->meta_description=$request->input('meta_description');
                $product->slug=$request->input('slug');
                $product->name=$request->input('name');
                $product->description=$request->input('description');
                $product->status=$request->input('status')==true?'1':'0';
                $product->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Product updated successfully',
                ]);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Product anot found',
                ]);
            }
           

        }
    }

    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'category_id'=>'required|max:255',
            'slug'=>'required|max:255',
            'name'=>'required|max:255',
            'brand'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'original_price'=>'required|max:20',
            'qty'=>'required|max:4',
            'image'=>'image|mimes:jpeg,jpg,png|max:2048',
        ]);
        if($validator->fails()){
            
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            $product=new Product;
            $product->category_id=$request->input('category_id');
            $product->slug=$request->input('slug');
            $product->name=$request->input('name');
            $product->description=$request->input('description');

            $product->meta_title=$request->input('meta_title');
            $product->meta_keyword=$request->input('meta_keyword');
            $product->meta_description=$request->input('meta_description');

            $product->brand=$request->input('brand');
            $product->selling_price=$request->input('selling_price');
            $product->original_price=$request->input('original_price');
            $product->qty=$request->input('qty');

            if($request->hasFile('image')){
                $file=$request->file('image');
                $extension=$file->getClientOriginalExtension();
                $filename=time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $product->image='uploads/product/'.$filename;
            }

            $product->featured=$request->input('featured')==true?'1':'0';
            $product->popular=$request->input('popular')==true?'1':'0';
            $product->status=$request->input('status')==true?'1':'0';

            $product->save();
            
            return response()->json([
                'status'=>200,
                'message'=>'Product added successfully',
            ]);

        }
    }

    public function destroy($id){
        $product=Product::find($id);
        if($product){
            $product->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Product deleted successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Product not found',
            ]);
        }
        
    }
}
