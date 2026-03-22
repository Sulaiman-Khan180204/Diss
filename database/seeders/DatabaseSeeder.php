<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run your catalog seeder first so the reference data exists
        $this->call(CatalogSeeder::class);

        // Example demo user (optional)
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name'  => 'Test User', 'password' => bcrypt('password')],
        );
    }
}