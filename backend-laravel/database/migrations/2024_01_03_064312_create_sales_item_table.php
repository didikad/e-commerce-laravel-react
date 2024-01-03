<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales_item', function (Blueprint $table) {
            $table->id();
            $table->integer('id_product');
            $table->integer('id_sales');
            $table->integer('id_customer');
            $table->integer('qty');
            $table->decimal('price', 19, 4);
            $table->text('ket');
            // $table->timestamps();

            // $table->foreign('id_product')->references('id')->on('product');
            // $table->foreign('id_sales')->references('id')->on('sales');
            // $table->foreign('id_customer')->references('id')->on('customer');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_item');
    }
};
