<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('product_ingredients', function (Blueprint $table) {
            $table->float('amount_mg')->nullable()->after('ingredient_id');
            $table->string('form_note')->nullable()->after('amount_mg');
        });
    }

    public function down(): void
    {
        Schema::table('product_ingredients', function (Blueprint $table) {
            $table->dropColumn(['amount_mg', 'form_note']);
        });
    }
};
