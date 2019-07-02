<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Group;
use App\Type;

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
        $thisType= Type::find($tid);
        Log::info($thisType);
        $group=Group::where('id', $id)->with(['users','users.types', 'users.players'])->get();

        $totalHype = $group->pluck('users')->collapse()->map(function ($user) use ($tid) {
            return    $user->types->map(function ($type) use ($tid ){    
                            if($type->type == $tid) {
                            return $type->pivot->hype;  
                            }
                            return 0;
                        });
        })->collapse()->toArray();

        $numberOfPlayers = $group->pluck('users')->collapse()->map(function ($user) use ($tid ,$thisType) {
            return    $user->players->map(function ($player) use ($tid ,$thisType){    
                Log::info($player);
                            if($player->type == $thisType->type) {
                            return 1;  
                            }
                            return 0;
                        });
        })->collapse()->toArray();

        $type=Type::where('id', $tid)->with('users')->get();
        $types=Type::all()->load('groups');

         return response()->json([
             'group' =>$group[0],
             'type' => $type[0],
             'types' => $types,
             'totalHype' => array_sum($totalHype),
             'numberOfPlayers' => array_sum($numberOfPlayers),
             ]);
}


}