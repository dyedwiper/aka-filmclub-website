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
            'title' => 'Johnny Flash',
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-28 20:00:00')),
            'original_title' => null,
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'directed_by' => 'Werner Nekes',
            'written_by' => 'Peter Ritz, Werner Nekes',
            'music_by' => 'Helge Schneider',
            'shot_by' => 'Bernd Upnmoor, Serge Roman',
            'cast' => 'Helge Schneider, Andreas Kunze, Heike Melba-Fendel',
            'country' => 'BRD',
            'year' => '1986',
            'length' => '86',
            'medium' => '35mm',
            'version' => 'dt. OV',
            'venue' => 'GHS Biologie',
            'special' => null,
            'tercet' => null,
            'author' => 'maxb',
            'image' => 'johnny.jpg',
        ], [
            'title' => 'Fish Tank',
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-29 20:00:00')),
            'original_title' => null,
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'directed_by' => 'Andrea Arnold',
            'written_by' => null,
            'music_by' => null,
            'shot_by' => null,
            'cast' => null,
            'country' => 'GB',
            'year' => '2005',
            'length' => '86',
            'medium' => 'DCP',
            'version' => 'engl. OmU',
            'venue' => 'GHS Biologie',
            'special' => null,
            'tercet' => null,
            'author' => 'maxb',
            'image' => 'fish_tank.jpg',
        ], [
            'title' => 'Der Riss',
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-30 20:00:00')),
            'original_title' => 'La Rupture',
            'synopsis' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'directed_by' => 'Claude Chabrol',
            'written_by' => null,
            'music_by' => null,
            'shot_by' => null,
            'cast' => null,
            'country' => 'FR',
            'year' => '1970',
            'length' => '120',
            'medium' => 'DVD',
            'version' => 'frz. OmU',
            'venue' => 'GHS Biologie',
            'special' => null,
            'tercet' => null,
            'author' => 'maxb',
            'image' => 'der_riss.jpg',
        ]]);
    }
}
