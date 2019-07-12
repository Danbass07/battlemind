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


        $groups =  Group::with('users')->get();
        $user =  Auth::user();
        $result = $user->load('players','groups')->groups->map(function ($group , $key){
            return $group;
        });
       return response()->json([
        'groups' => $groups,
        'result' => $result,
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
    public function addUser($id)
    {
        $group = \App\Group::findOrfail($id);
        $user =  Auth::user();
       
      
        if (! $group->users->contains($user->id)) {
        $group->users()->save($user);
        }
       return response()->json($group->users); 
    }
    public function removeUser($id)
    {
        $group = \App\Group::findOrfail($id);
        $user =  Auth::user()->load('groups');
       
      
        $user->types()->detach();
        $group->users()->detach($user);
        
       return response()->json($group->users); 
    }

}
