<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SerialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('serials')->insert([[
            'uuid' => uniqid(),
            'title' => 'Die besten Filme aller Zeiten',
            'subtitle' => 'vielleicht',
            'article' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nostrum, nemo fugit quae aut dicta aliquid perspiciatis dolore repellendus dolores ratione nobis, accusamus, ut possimus corporis exercitationem quisquam est asperiores.',
            'author' => 'Max',
            'semester' => 'WS2020',
        ]]);
    }
}
