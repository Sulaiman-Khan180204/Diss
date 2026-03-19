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
        Schema::create('educational_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ingredient_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('condition_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('rich_html');
            $table->text('safety_notes')->nullable();
            $table->string('dosage_guidance')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educational_cards');
    }
};
