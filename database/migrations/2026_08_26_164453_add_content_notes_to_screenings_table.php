<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (!Schema::hasColumn('screenings', 'content_notes')) {
            Schema::table('screenings', function (Blueprint $table) {
                $table->text('content_notes')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('screenings', 'content_notes')) {
            Schema::table('screenings', function (Blueprint $table) {
                $table->dropColumn('content_notes');
            });
        }
    }
};
