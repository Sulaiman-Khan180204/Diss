<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('compounds', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('product_compound', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('compound_id')->constrained()->cascadeOnDelete();
            $table->primary(['product_id', 'compound_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_compound');
        Schema::dropIfExists('compounds');
    }
};
