<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['name' => 'user'],
            [
                'email'    => 'user@test.local',
                'password' => Hash::make('user'),
            ]
        );
    }
}
