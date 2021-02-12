<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert([[
            'uuid' => uniqid(),
            'source' => 'johnny.jpg',
            'title' => null,
            'alt_text' => null,
            'copyright' => null,
        ], [
            'uuid' => uniqid(),
            'source' => 'fish_tank.jpg',
            'title' => null,
            'alt_text' => null,
            'copyright' => null,
        ], [
            'uuid' => uniqid(),
            'source' => 'der_riss.jpg',
            'title' => null,
            'alt_text' => null,
            'copyright' => null,
        ]]);
    }
}
