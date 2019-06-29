<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Group;

class HypeController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $group=Group::where('id', $id)->with('types')->get()->flatten();
       $types=$group->pluck('types')->collapse();

        return response()->json([
            'group' =>$group[0],
            'types' => $types
            ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function typedetail($id, $tid)
  {
        
        $group=Group::where('id', $id)->with(['users.types', 'users.players'])->get();
        $totalHype = $group->pluck('users')->collapse()->map(function ($user) use ($tid) {
            return    $user->types->map(function ($type) use ($tid ){    
                            if($type->id == $tid) {
                            return $type->pivot->hype;  
                            }
                            return 0;
                        });
        })->collapse()->toArray();
        $numberOfPlayers = $group->pluck('users')->collapse()->map(function ($user) use ($tid) {
            return    $user->players->map(function ($player) use ($tid ){    
                            if($player->id == $tid) {
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
