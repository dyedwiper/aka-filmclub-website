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
        DB::table('screenings')->insert([
            // 'date' => new DateTime('2021-10-28 20:00:00'),
            'date' => date('Y-m-d H:i:s', strtotime('2021-10-28 20:00:00')),
            'title' => 'Johnny Flash',
            'original_title' => null,
            'directed_by' => 'Werner Nekes',
            'synopsis' => 'bester film',
            'image' => null,
        ]);
    }
}
