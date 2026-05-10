<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id', 'age_range', 'sex', 'diet_type',
        'goals', 'conditions', 'stress_level',
        'sun_exposure', 'exercise_frequency', 'onboarding_completed_at',
    ];

    protected $casts = [
        'goals'      => 'array',
        'conditions' => 'array',
        'onboarding_completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
