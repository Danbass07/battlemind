<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHypenotizerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
           

        Schema::create('hypenotizer', function (Blueprint $table) {
           
            $table->increments('id');
            $table->integer('user_id')->nullable()->unsigned();
            $table->foreign('user_id')->references('id')
                  ->on('users')->onDelete('cascade');
      
            $table->integer('type_id')->unsigned()->nullable();
            $table->foreign('type_id')->references('id')
                  ->on('types')->onDelete('cascade');
            $table->integer('hype')->default('5');   
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
        Schema::table('hypenotizer', function (Blueprint $table) {
            //
        });
    }
}
