<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'uuid' => uniqid(),
            'created_at' => Carbon::now(),
            'username' => 'armin',
            'password' => '$argon2id$v=19$m=1024,t=4,p=2$aEtzYWc3cTBFS2RGSmVWVQ$G5LW5WJLL4x9UMsA3rmOJg',
            'level' => 2,
            'email' => 'armin@existiert.net',
            'realname' => 'Armin Admin',
        ]);

        DB::table('texts')->insert([
            [
                'created_at' => Carbon::now(),
                'page' => 'about',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'awards',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'contact',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'home',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'imprint',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'links',
                'text' => '',
            ], [
                'created_at' => Carbon::now(),
                'page' => 'press',
                'text' => '',
            ]
        ]);
    }
}
