<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('suitable_age')->nullable()->after('image_url');
            $table->string('vegan_friendly')->nullable()->after('suitable_age');
            $table->string('pregnancy_safe')->nullable()->after('vegan_friendly');
            $table->string('children_safe')->nullable()->after('pregnancy_safe');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['suitable_age', 'vegan_friendly', 'pregnancy_safe', 'children_safe']);
        });
    }
};
