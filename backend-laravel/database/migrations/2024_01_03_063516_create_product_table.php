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
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('code', 255);
            $table->bigInteger('id_category');
            $table->string('name', 255);
            $table->string('img', 255);
            $table->integer('weight');
            $table->integer('stock');
            $table->decimal('price', 19, 4);
            $table->decimal('price_discount', 19, 4);
            $table->integer('id_parent')->nullable();
            $table->text('description');
            $table->string('variant', 255);
            $table->enum('type', ['parent', 'child'])->default('parent');
            $table->enum('status', ['active', 'inactive'])->default('active');
            // $table->timestamps();

            // $table->foreign('id_category')->references('id')->on('category');
            // $table->foreign('id_parent')->references('id')->on('product')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
