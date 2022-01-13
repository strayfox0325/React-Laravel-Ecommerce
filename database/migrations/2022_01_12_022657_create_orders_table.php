<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('forname');
            $table->string('surname');
            $table->string('phone');
            $table->string('email');
            $table->string('address');
            $table->string('city');
            $table->string('zip');
            $table->string('country');
            $table->string('payment_id')->nullable();
            $table->string('payment_mode');
            $table->string('tracking_no');
            $table->string('status')->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
