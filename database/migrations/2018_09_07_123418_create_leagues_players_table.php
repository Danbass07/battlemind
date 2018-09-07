<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeaguesPlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('league_player', function (Blueprint $table) {
           
           
            $table->integer('league_id')->unsigned()->nullable();
            $table->foreign('league_id')->references('id')
                  ->on('leagues')->onDelete('cascade');
      
            $table->integer('player_id')->unsigned()->nullable();
            $table->foreign('player_id')->references('id')
                  ->on('players')->onDelete('cascade');
            $table->integer('win')->nullable();   
            $table->integer('lost')->nullable();
            $table->integer('draw')->nullable();   
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
        Schema::dropIfExists('leagues_players');
    }
}
