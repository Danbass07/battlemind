<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Player;
use App\League;
use App\User;
use App\Group;
use App\Scoreboard;

class ScoreboardController extends Controller
{

    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Scoreboard $scoreboard) {
      

        $user = User::with(['groups.types', 'groups.users.players', 'players', 'groups'])->where('id', '=' ,$request->user()->id)->first();
        $userGroups = $user->groups;
        $userScoreboards = $user->scoreboards;
        $friendsUsers = $userGroups->pluck('users')->map->filter(function ($groupUser) use ($user) {
            return $groupUser->isNot($user);
            })->collapse();
        $friendsScoreboards =  $friendsUsers->pluck('scoreboards')->collapse()->unique('id');

        foreach ($friendsScoreboards as $friendScoreboard) {
            foreach ($friendsUsers as $friendUser){
                if($friendUser->id === $friendScoreboard->user_id) {
                      $friendScoreboard->user_id = $friendUser->name;
                }
            }
        }

         return response()->json(['content' => [$userScoreboards, $friendsScoreboards]]);
      
      
       
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
          $users = User::all();
          foreach ($scoreboardPlayers as $player) {
            foreach ($users as $user){
                if($user->id === $player->user_id) {
                     $player->user_name = $user->name;
                }
            }
        }
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
    public function updateResults(Request $request, $id){
        $scoreboard = Scoreboard::findOrFail($id);
        $scoreboardplayers = json_decode(json_encode($request->scoreboardplayers ), FALSE);
    

         foreach ($scoreboard->players as $player) {
             foreach ($scoreboardplayers as $scoreboardplayer) {
                 if ((string)$player->pivot->player_id === (string)$scoreboardplayer->pivot->player_id) {
                    $player->pivot->win = $scoreboardplayer->pivot->win; 
                    $player->pivot->lost = $scoreboardplayer->pivot->lost;
                    $player->pivot->draw = $scoreboardplayer->pivot->draw; 
                   $player->pivot->save();
                }
        
           
            }

        } 
        return response($scoreboardplayers);
    }
    
    public function friendsContent($id) 
    {
       
        $group = Group::findOrFail($id)->load('users.leagues');
        $scoreboards = $group->users->map(function ($groupUser)  {
            $user =  Auth::user();
            if($groupUser->id !== $user->id) {
                $groupUser->scoreboards->map(function ($scoreboard) use ($groupUser) {
                    $scoreboard->user_name = $groupUser->name;
                });
                return $groupUser->scoreboards;
            } 
            })->collapse();;
        return response()->json($scoreboards);
    }
}
