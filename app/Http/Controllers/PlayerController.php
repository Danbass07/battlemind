<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Player;
use App\League;
use App\User;
use App\Group;

class PlayerController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Player $player) {

        $user = User::with(['groups.types', 'groups.users.players', 'players', 'groups'])->where('id', '=' ,$request->user()->id)->first();
        $userGroups = $user->groups;
        $userPlayers = $user->players;
        $friendsUsers = $userGroups->pluck('users')->map->filter(function ($groupUser) use ($user) {
            return $groupUser->isNot($user);
            })->collapse();
        $friendPlayers =  $friendsUsers->pluck('players')->collapse()->unique('id');

        foreach ($friendPlayers as $friendPlayer) {
            foreach ($friendsUsers as $friendUser){
                if($friendUser->id === $friendPlayer->user_id) {
                     $friendPlayer->user_id = $friendUser->name;
                }
            }
        }

         return response()->json(['content' => [$userPlayers, $friendPlayers]]);
    }
    

   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:50',
            'type' => 'required|max:50',
            
        ]);
      
        
        $player = $request->user()->players()->create([
            'name' => $request->name,
            'type' => $request->type,
            'url' => $request->url,
            'wins' => $request->wins,
            'lost' => $request->lost,
            'draws' => $request->draws,
        ]);
           
        return response()->json($player->with('user')->find($player->id));
       
    }

  
    public function show($id)
    {
        //
    }

   
    public function edit($id)
    {
        $player = Player::findOrFail($id);
        return response()->json([
            'player' => $player,
        ]);
        return response();
    }

   
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $player = Player::findOrFail($id);
        $player->scoreboards()->detach();
        $player->update($input);
        return response()->json($player->with('user')->find($player->id));
    }

   
    public function destroy($id)
    {
        Player::findOrFail($id)->delete(); 
    }


    public function addResult($id, $pid, $category, $action)
    {
        $league = League::findOrFail($id);
        $number = 1;
        if ((string)$action === 'minus') {
            $number = -1;
        }  
        foreach ($league->players as $player) {

            if ((string)$player->pivot->player_id === (string)$pid) {
                if((string)$category === 'Win' ) { $player->pivot->win += $number; }
                if((string)$category === 'Lost' ) { $player->pivot->lost += $number; }
                if((string)$category === 'Draw' ) { $player->pivot->draw += $number; }
                    $player->pivot->save();   
            }            
    
        }
    }

}
