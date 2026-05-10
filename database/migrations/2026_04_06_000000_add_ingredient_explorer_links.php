<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add slug to ingredients for URL routing
        Schema::table('ingredients', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
        });

        // Link each compound back to its parent ingredient
        Schema::table('compounds', function (Blueprint $table) {
            $table->foreignId('ingredient_id')
                ->nullable()
                ->after('id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('compounds', function (Blueprint $table) {
            $table->dropForeign(['ingredient_id']);
            $table->dropColumn('ingredient_id');
        });

        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
