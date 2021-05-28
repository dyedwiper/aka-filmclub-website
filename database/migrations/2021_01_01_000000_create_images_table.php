<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->timestamps();
            $table->string('path');
            $table->string('alt_text')->nullable();
            $table->string('originator')->nullable();
            $table->string('link')->nullable();
            $table->boolean('keepShowingAfterSemester')->default(0);
            $table->unsignedBigInteger('license_id')->nullable();
            $table->foreign('license_id')->references('id')->on('licenses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
}
