<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->timestamps();
            $table->unsignedBigInteger('screening_id')->unique();
            $table->foreign('screening_id')->references('id')->on('screenings');
            $table->unsignedBigInteger('distributor_id')->nullable();
            $table->foreign('distributor_id')->references('id')->on('distributors');
            $table->string('confirmationNumber')->nullable();
            $table->integer('freeTickets');
            $table->integer('guarantee');
            $table->float('percentage');
            $table->integer('incidentals');
            $table->float('valueAddedTaxRate');
            $table->integer('cashInlay');
            $table->integer('cashOut');
            $table->integer('additionalEarnings');
            $table->text('comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('billings');
    }
}
