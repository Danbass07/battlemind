<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\User;
use App\Player;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class GroupController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }


    public function index(Request $request, Group $group)
    {
        $user = User::with(['groups.types', 'groups.users.players', 'players', 'groups'])->where('id', '=' ,$request->user()->id)->first();
     
        
        $userGroups = $user->groups->load('users.types');
        $groups =  Group::all()->load(['users', 'types', 'types.users']);
    
       return response()->json([
        'groups' => $userGroups,
        'userGroups' => $userGroups,
        'allGroups' => $groups,
       ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function destroy($id)
    {
        //
    }
    public function addUser($id, $cid)
    {
        $group = \App\Group::findOrfail($id);
        $user = User::findOrFail($cid);
       
      
        if (! $group->users->contains($user->id)) {
        $group->users()->save($user);
        foreach ($group->types as $type){

            $user->types()->save($type);
            $type->users()->updateExistingPivot($user->id, ['hype' => 2]);
        }
        }
       return response()->json($group->users); 
    }
    public function removeUser($id, $cid)
    {
        $group = \App\Group::findOrfail($id);
        $user =  User::findOrFail($cid)->load('groups');
        foreach ($group->types as $type){

            $user->types()->detach($type);
        }
      
        
        $group->users()->detach($user);
        
       return response()->json($group->users); 
    }

    public function toggleActiveUser($id, $cid) {

          $user = User::findOrFail($cid);
        foreach ($user->groups as $group) {
          
            if ($group->id == $id) {
                Log::info($group->pivot->active);
                $group->pivot->active = !$group->pivot->active;
                $group->pivot->save();
            }
        }
        return response()->json($user);

    }
  

}
