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
            $table->uuid('uuid')->nullable();
            $table->timestamps();
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
            $table->integer('year')->nullable();
            $table->integer('length')->nullable();
            $table->string('medium')->nullable();
            $table->string('version')->nullable();
            $table->string('venue');
            $table->text('special')->nullable();
            $table->text('tercet')->nullable();
            $table->unsignedBigInteger('serial_fk')->nullable();
            $table->foreign('serial_id')->references('id')->on('serials');
            $table->string('author')->nullable();
            $table->string('image')->nullable();
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
