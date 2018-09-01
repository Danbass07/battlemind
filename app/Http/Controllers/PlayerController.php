<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Player;

class PlayerController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Player $player) {
         $allPlayers = $player->whereIn('user_id', $request->user())->with('user');
         $players = $allPlayers->orderBy('wins','desc')->get();
         return response()->json(['players' => $players,]);
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
            'url' => 'required|max:50',
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
        $player->update($input);
        return response()->json($player->with('user')->find($player->id));
    }

   
    public function destroy($id)
    {
        Player::findOrFail($id)->delete(); 
    }
}
