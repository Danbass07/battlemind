<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Group;
use App\Type;
use App\Player;
use Illuminate\Support\Facades\Auth;

class HypeController extends Controller
{
  
    public function index($id)
    {
        $group=Group::where('id', $id)->with('types')->get()->flatten();
       $types=$group->pluck('types')->collapse();

        return response()->json([
            'group' =>$group[0],
            'types' => $types
            ]);
    }

 
  

    public function typedetail($id, $tid)
  {

        $type= Type::find($tid)->load('users');
        $group=Group::where('id', $id)->with(['users','users.types', 'users.players'])->get();

        $totalHype = $type->users->map(function ($user) use ($tid) { /// collect all hype values 
           
            return    $user->types->map(function ($type) use ($tid){    
             
                            if($type->id === intval($tid)) {
                            return $type->pivot->hype;
                            }
                            return ;
                        });
        })->collapse()->toArray();

        $numberOfPlayers = $group->pluck('users')->collapse()->map(function ($user) use ($tid ,$type) {
            return    $user->players->map(function ($player) use ($tid ,$type){    
               
                            if($player->type == $type->type) {
                            return 1;  
                            }
                            return 0;
                        });
        })->collapse()->toArray();

       $numberOfGames = Player::where('type', $type->type)->get()->load('scoreboards')->pluck('scoreboards') /// collect all win games to estimate number of games need to include drawa
                        ->map( function ($scoreboards) {
           return $scoreboards->map(function ($scoreboard) {
               return $scoreboard->pivot->win;
           });
       })->collapse();

         return response()->json([
             'type' => $type,
             'group' =>$group[0],
             'totalHype' => array_sum($totalHype),
             'numberOfPlayers' => array_sum($numberOfPlayers),
             'numberOfGames' => array_sum($numberOfGames->toArray()),
             ]);
    }
    public function hypenotizer(Request $request) {

        $user =  Auth::user();              //find user
        $user->types()->detach();           //delete past results

        foreach ($request->userTypes as $userType) { // loop and set values
            $type = Type::find($userType['id']);
            $user->types()->save($type);
            $type->users()->updateExistingPivot($user->id, ['hype' => $userType['hype']]);
        }
        return response('success');
    }


}