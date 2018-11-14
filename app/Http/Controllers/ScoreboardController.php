<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;
use App\League;
use App\User;

class ScoreboardController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }

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

   public function store(Request $request)
   {
       $this->validate($request, [
           'name' => 'required|max:50',
           'type' => 'required|max:50',
           
       ]);
       
     
       
       $scoreboard = $request->user()->scoreboards()->create([
           'name' => $request->name,
           'type' => $request->type,
       ]);
          
         return response()->json($scoreboard->with('user')->find($scoreboard->id));
      }
 
}
