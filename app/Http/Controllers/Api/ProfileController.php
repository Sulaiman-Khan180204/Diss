<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json(['profile' => $request->user()->profile]);
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'age_range'          => 'nullable|string',
            'sex'                => 'nullable|string',
            'diet_type'          => 'nullable|string',
            'goals'              => 'nullable|array',
            'conditions'         => 'nullable|array',
            'stress_level'       => 'nullable|string',
            'sun_exposure'       => 'nullable|string',
            'exercise_frequency' => 'nullable|string',
        ]);

        $data['onboarding_completed_at'] = now();

        $profile = UserProfile::updateOrCreate(
            ['user_id' => $request->user()->id],
            $data
        );

        return response()->json(['profile' => $profile]);
    }
}
