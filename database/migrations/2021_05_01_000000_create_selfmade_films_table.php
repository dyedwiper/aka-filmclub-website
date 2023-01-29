<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfmadeFilmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('selfmade_films', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->timestamps();
            $table->string('updated_by', 32)->nullable();
            $table->string('title');
            $table->text('synopsis')->nullable();
            $table->string('directed_by')->nullable();
            $table->string('written_by')->nullable();
            $table->string('music_by')->nullable();
            $table->string('shot_by')->nullable();
            $table->string('edited_by')->nullable();
            $table->string('cast')->nullable();
            $table->string('country')->nullable();
            $table->string('year')->nullable();
            $table->integer('length')->nullable();
            $table->string('vimeo_id')->nullable();
            $table->integer('position');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('selfmade_films');
    }
}
