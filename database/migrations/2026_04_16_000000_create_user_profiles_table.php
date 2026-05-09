<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('age_range')->nullable();        // '18-25','26-35','36-50','50+'
            $table->string('sex')->nullable();              // 'male','female','prefer_not_to_say'
            $table->string('diet_type')->nullable();        // 'omnivore','vegetarian','vegan','keto'
            $table->json('goals')->nullable();              // ['energy','sleep','immunity',...]
            $table->json('conditions')->nullable();         // condition slugs user selected
            $table->string('stress_level')->nullable();     // 'low','moderate','high'
            $table->string('sun_exposure')->nullable();     // 'low','moderate','high'
            $table->string('exercise_frequency')->nullable(); // 'sedentary','light','moderate','active'
            $table->timestamp('onboarding_completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
