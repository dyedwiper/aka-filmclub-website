<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->nullable();
            $table->timestamps();
            $table->string('updated_by', 32)->nullable();
            // Der username darf höchstens 191 Zeichen lang sein, sonst gibt es einen SQL-Fehler wegen des unique Index.
            // Aber 32 Zeichen sind auch genug.
            $table->string('username', 32)->unique();
            $table->string('password');
            $table->integer('level')->default(0);
            $table->integer('status')->default(0);
            $table->string('email');
            $table->string('realname')->nullable();
            $table->string('address')->nullable();
            $table->string('zipcode', 15)->nullable();
            $table->string('city')->nullable();
            $table->string('phone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
