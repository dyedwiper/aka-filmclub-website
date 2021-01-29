<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScreeningSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('screenings')->insert([[
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-28 20:00:00')),
            'title' => 'Johnny Flash',
            'original_title' => null,
            'directed_by' => 'Werner Nekes',
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'johnny.jpg',
        ], [
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-29 20:00:00')),
            'title' => 'Fish Tank',
            'original_title' => null,
            'directed_by' => 'Andrea Arnold',
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'fish_tank.jpg',
        ], [
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-30 20:00:00')),
            'title' => 'Der Riss',
            'original_title' => 'La Rupture',
            'directed_by' => 'Claude Chabrol',
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'der_riss.jpg',
        ]]);
    }
}
