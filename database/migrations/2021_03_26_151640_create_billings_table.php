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
            $table->unsignedBigInteger('screening_id');
            $table->foreign('screening_id')->references('id')->on('screenings');
            $table->unsignedBigInteger('distributor_id')->nullable();
            $table->foreign('distributor_id')->references('id')->on('distributors');
            $table->string('confirmationNumber')->nullable();
            $table->integer('admissions');
            $table->integer('freeTickets');
            $table->integer('passes');
            $table->decimal('guarantee', 8, 2);
            $table->float('percentage');
            $table->decimal('incidentals', 8, 2);
            $table->float('valueAddedTax');
            $table->decimal('cashInlay', 8, 2);
            $table->decimal('cashOut', 8, 2);
            $table->decimal('additionalEarnings', 8, 2);
            $table->string('comment')->nullable();
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
