<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;
use App\League;
use App\User;

class ScoreboardController extends Controller
{
    public function index(Request $request) {
        $players = Player::all();
        $leagues = League::all();
        $users = User::all();
       
       
          
        return response()->json([
            'players' => $players,
            'leagues' => $leagues,
            'users' => $users,
            
            
        ]);
   }
}
