<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use ScreeningSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ScreeningSeeder::class
        ]);
    }
}
