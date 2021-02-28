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
            'uuid' => uniqid(),
            'title' => 'Neu neu neu',
            'date' => date('Y-m-d', strtotime('2021-03-22')),
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image_id' => null,
        ], [
            'uuid' => uniqid(),
            'title' => 'Alt alt alt',
            'date' => date('Y-m-d', strtotime('2021-03-23')),
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image_id' => null,
        ], [
            'uuid' => uniqid(),
            'title' => 'foo bar baz',
            'date' => date('Y-m-d', strtotime('2021-03-24')),
            'author' => 'Max',
            'content' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, fugiat nesciunt, ipsum omnis ipsam sequi illum ullam consequuntur nisi enim sunt accusantium quasi natus cupiditate vero saepe consequatur. Doloribus, quas!',
            'image_id' => null,
        ]]);
    }
}
