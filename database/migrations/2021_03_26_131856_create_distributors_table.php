<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDistributorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distributors', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->timestamps();
            $table->string('updated_by', 32)->nullable();
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('zipcode', 15)->nullable();
            $table->string('city')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->string('taxId')->nullable();
            $table->string('customerId')->nullable();
            $table->string('accountOwner')->nullable();
            $table->string('iban')->nullable();
            $table->string('bic')->nullable();
            $table->string('bank')->nullable();
            $table->string('accountNumberOldFormat')->nullable();
            $table->string('bankIdOldFormat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distributors');
    }
}
