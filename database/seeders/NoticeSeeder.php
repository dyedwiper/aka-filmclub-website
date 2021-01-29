<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notices')->insert([[
            'title' => 'Neu neu neu',
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'johnny.jpg',
        ], [
            'title' => 'Alt alt alt',
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'fish_tank.jpg',
        ], [
            'title' => 'foo bar baz',
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image' => 'der_riss.jpg',
        ]]);
    }
}
