<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\League;
use App\Player;
use App\User;
use App\Group;
class LeagueController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request) {


        $user = User::with(['groups.types', 'groups.users.leagues', 'leagues', 'groups'])->where('id', '=' ,$request->user()->id)->first();
        $userGroups = $user->groups;
        $userLeagues = $user->leagues;
        $friendsUsers = $userGroups->pluck('users')->map->filter(function ($groupUser) use ($user) {
            return $groupUser->isNot($user);
            })->collapse();
        $friendsLeagues =  $friendsUsers->pluck('leagues')->unique('id')->collapse();

         return response()->json(['content' => [$userLeagues, $friendsLeagues]]);
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
        $players = League::findOrFail($id)->players()->get();
        return response()->json([
            'league' => $league,
            'players' => $players,
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
        $player = \App\Player::find($player_id);
        $leagues->players()->save($player);
        return response()->json($leagues->players);
    }

    public function removePlayer($league_id, $player_id )
    {
        $leagues = \App\League::find($league_id);
        $player = \App\Player::find($player_id);
        $leagues->players()->detach($player);
        $leaguePlayers = League::findOrFail($league_id)->players()->get();
        return response()->json($leaguePlayers);
    }
    public function getResults($league_id)
    {
        $league = \App\League::find($league_id);
        $leaguePlayers = $league->players;
        return response()->json([$leaguePlayers]);
    }
    public function friendsContent($id) 
    {
       
        $group = Group::findOrFail($id)->load('users.leagues');
        $leagues = $group->users->map(function ($groupUser)  {
            $user =  Auth::user();
            if($groupUser->id !== $user->id) {
                $groupUser->leagues->map(function ($league) use ($groupUser) {
                    $league->user_name = $groupUser->name;
                });
                return $groupUser->leagues;
            } 
            })->collapse();
        return response()->json($leagues);
    }
}
