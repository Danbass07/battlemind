<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;
use App\League;
use App\User;
use App\Scoreboard;

class ScoreboardController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Scoreboard $scoreboard) {
        // $players = Player::all();
        // $leagues = League::all();
        // $users = User::all();
       
       
          
        // return response()->json([
        //     'players' => $players,
        //     'leagues' => $leagues,
        //     'users' => $users,
            
            
        // ]);
       
            $allScoreboards = $scoreboard->whereIn('user_id', $request->user())->with('user');
            $scoreboards = $allScoreboards->get();
            return response()->json(['content' => $scoreboards,]);
      
       
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

      public function edit($id)
      {
          $scoreboard = Scoreboard::findOrFail($id);
          $scoreboardPlayers = $scoreboard->players()->get();
          return response()->json([
              'scoreboard' => $scoreboard,
              'scoreboardPlayers' => $scoreboardPlayers,
          ]);
          
      }
      
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $scoreboard = Scoreboard::findOrFail($id);
        $scoreboard->update($input);
        return response()->json($scoreboard->with('user')->find($scoreboard->id));
    }

    public function destroy($id)
    {
        Scoreboard::findOrFail($id)->delete(); 
    }

    public function addPlayer($scoreboard_id, $player_id )
    {
        $scoreboard = \App\Scoreboard::find($scoreboard_id);
        $player = \App\Player::find($player_id);
        if (! $scoreboard->players->contains($player->id)) {
        $scoreboard->players()->save($player);
        }
       return response()->json($scoreboard->players); 
    
    }

    public function removePlayer($scoreboard_id, $player_id )
    {
        $scoreboard = \App\Scoreboard::find($scoreboard_id);
        $player = \App\Player::find($player_id);
        
        $scoreboard->players()->detach($player);
        $scoreboardPlayers = Scoreboard::findOrFail($scoreboard_id)->players()->get();

       
       return response()->json($scoreboard->players);
    }

    public function addResult($id, $pid, $category, $action)
    {

            $scoreboard = Scoreboard::findOrFail($id);
            $number = 1;
            if ((string)$action === 'minus') {
                $number = -1;
            }  
                foreach ($scoreboard->players as $player) {
                    if ((string)$player->pivot->player_id === (string)$pid) {
                        if((string)$category === 'Win' ) { $player->pivot->win += $number; }
                        if((string)$category === 'Lost' ) { $player->pivot->lost += $number; }
                        if((string)$category === 'Draw' ) { $player->pivot->draw += $number; }
                            $player->pivot->save();
                        
                        
            }            
        
        }
    }
}
