<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table='categories';
    protected $fillable=[
        'meta-title',
        'meta-keyword',
        'meta-description',
        'slug',
        'name',
        'description',
        'status',
    ];
}
