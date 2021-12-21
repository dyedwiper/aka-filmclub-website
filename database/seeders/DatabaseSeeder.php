<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
            [
                'uuid' => uniqid(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'username' => 'armin',
                'password' => Hash::make('armin'),
                'level' => Config::get('constants.auth_level.admin'),
                'email' => 'armin@existiert.net',
                'realname' => 'Armin Admin',
            ],
            [
                'uuid' => uniqid(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'username' => 'edith',
                'password' => Hash::make('edith'),
                'level' => Config::get('constants.auth_level.editor'),
                'email' => 'edith@existiert.net',
                'realname' => 'Edith Editorin',
            ],
            [
                'uuid' => uniqid(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'username' => 'otto',
                'password' => Hash::make('otto'),
                'level' => Config::get('constants.auth_level.normal'),
                'email' => 'otto@existiert.net',
                'realname' => 'Otto Normalmitglied',
            ]
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
