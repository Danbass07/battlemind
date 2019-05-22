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

        $user = $request->user();

        $groupsJoinedByUser = Group::whereHas('users', function ($query) use ($user) {
            $query->whereKey($user->id);
        })->get();

        $result = $user->load('players','groups')->groups->map(function ($group , $key){

           
        })
        ;
        $players = Player::select('players.*')
        ->join('users', 'players.user_id', '=', 'users.id')
        ->join('group_user', 'users.id', '=', 'group_user.user_id')
        ->join('groups_joined_by_user', $groupsJoinedByUser , function($join) {
            $join->on('group_user.group_id', '=', 'groups_joined_by_user.id');
        })
        ->where('users.id', '!=', $user->id)
        ->distinct()
        ->get();

        
        $users = User::all();
        $userGroups = $user->groups;
        $friendsPlayers = [];
    
        foreach ($userGroups as $group) {

            $groupUsers = $group->users;
        
            foreach ($groupUsers as $groupUser) {

                if ($groupUser->id !== $user->id ) {

                    $userPlayer = $groupUser->players;

                    foreach ($userPlayer as $player) {

                        if(!in_array($player, $friendsPlayers)){

                            $friendsPlayers[]=$player;

                        }

                    }
            
                }
            
            }
           
            
        }
        $userPlayers = $user->players;
         $allplayers = Player::all();
         $allPlayersWithUser = $player->whereIn('user_id', $request->user())->with('user');
         $players = $allPlayersWithUser->orderBy('wins','desc')->get();
         return response()->json(['content' => [$userPlayers,$players],
                                    'allplayers' => $allplayers,
                                    'friendsplayers' => $friendsPlayers,
                                    'userplayers' => $userPlayers,
                                     'test'=> $groupsJoinedByUser,
                                    ]);
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


    public function addResult($id, $pid, $category, $action) {

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

    public function addWin($id, $pid)
    {
         $league = League::findOrFail($id);
                      
        foreach ($league->players as $player) {
                 if ((string)$player->pivot->player_id === (string)$pid) {
                $player->pivot->win += 1;
                $player->pivot->save();
                $wins = $player->pivot->win;
                
            }
    }
        
    }
    public function addLost($id, $pid)
    {
         $league = League::findOrFail($id);
         
      
        
        foreach ($league->players as $player) {
                 if ((string)$player->pivot->player_id === (string)$pid) {
                $player->pivot->lost += 1;
                $player->pivot->save();
                $lost = $player->pivot->lost;
                
            } 
        }
        return response()->json($lost);  
    }
    
    public function addDraw($id, $pid)
    {
         $league = League::findOrFail($id);
         
      
        
        foreach ($league->players as $player) {
                 if ((string)$player->pivot->player_id === (string)$pid) {
                $player->pivot->draw += 1;
                $player->pivot->save();
                $draw = $player->pivot->draw;
                
            } 
        }
        return response()->json($draw);  
    }
}
