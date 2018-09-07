<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\League;
use App\Player;

class LeagueController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, League $league) {
         $allLeagues = $league->whereIn('user_id', $request->user())->with('user');
         $leagues = $allLeagues->get();
         return response()->json(['leagues' => $leagues,]);
    }
    

   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:50',
            'win_point_value' => 'required',
            'lost_point_value' => 'required',
            'draw_point_value' => 'required',
            
        ]);
        $league = $request->user()->leagues()->create([
            'name' => $request->name,
            'win_point_value' => $request->win_point_value,
            'lost_point_value' => $request->lost_point_value,
            'draw_point_value' => $request->draw_point_value,
            
        ]);

        return response()->json($league->with('user')->find($league->id));
    }

  
    public function show($id)
    {
        //
    }

   
    public function edit($id)
    {
        $league = League::findOrFail($id);
        return response()->json([
            'league' => $league,
        ]);
    }

   
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $league = League::findOrFail($id);
        $league->update($input);
        return response()->json($league->with('user')->find($league->id));
    }

   
    public function destroy($id)
    {
        League::findOrFail($id)->delete(); 
    }

    public function addPlayer($league_id, $player_id )
    {
        $leagues = \App\League::find($league_id);
        $players = \App\Player::find($player_id);
        
        $leagues->players()->save($players);
       // return response()->json($player);
    }
}