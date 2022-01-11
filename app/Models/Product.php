<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table='products';
    protected $fillable=[
        'category_id',
        'slug',
        'name',
        'description',

        'meta_title',
        'meta_keyword',
        'meta_desription',

        'selling_price',
        'original_price',
        'qty',
        'brand',
        'featured',
        'popular',
        'status',
    ];

    protected $with=['category'];
    public function category(){
        //relationship join
        return $this->belongsTo(Category::class,'category_id','id');
    }
}
