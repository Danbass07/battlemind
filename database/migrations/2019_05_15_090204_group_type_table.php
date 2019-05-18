<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GroupTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_type', function (Blueprint $table) {
            
            $table->integer('group_id')->unsigned()->nullable();
            $table->foreign('group_id')->references('id')
                  ->on('groups')->onDelete('cascade');
      
            $table->integer('type_id')->unsigned()->nullable();
            $table->foreign('type_id')->references('id')
                  ->on('types')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
