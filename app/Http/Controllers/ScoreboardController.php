<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;
use App\League;

class ScoreboardController extends Controller
{
    public function index(Request $request) {
        $players = Player::all();
        $leagues = League::all();
        $league = League::findOrFail(2)->players()->get();

       
       
          
        return response()->json([
            'players' => $players,
            'leagues' => $leagues,
            'leaguePlayers' => $league,
            
        ]);
   }
}
