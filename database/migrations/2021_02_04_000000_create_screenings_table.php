<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreeningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screenings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->timestamps();
            $table->string('updated_by', 32)->nullable();
            $table->string('title');
            $table->dateTime('date');
            $table->string('original_title')->nullable();
            $table->text('synopsis');
            $table->string('directed_by')->nullable();
            $table->string('written_by')->nullable();
            $table->string('music_by')->nullable();
            $table->string('shot_by')->nullable();
            $table->string('cast')->nullable();
            $table->string('country')->nullable();
            $table->string('year')->nullable();
            $table->integer('length')->nullable();
            $table->string('medium')->nullable();
            $table->string('version')->nullable();
            $table->string('venue');
            $table->string('special')->nullable();
            $table->text('tercet')->nullable();
            $table->string('author')->nullable();
            $table->text('fsk')->nullable();
            $table->unsignedBigInteger('serial_id')->nullable();
            $table
                ->foreign('serial_id')
                ->references('id')
                ->on('serials');
            $table->unsignedBigInteger('image_id')->nullable();
            $table
                ->foreign('image_id')
                ->references('id')
                ->on('images');
            $table->unsignedBigInteger('preScreeningOf')->nullable();
            $table
                ->foreign('preScreeningOf')
                ->references('id')
                ->on('screenings');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screenings');
    }
}
