<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $user = User::with(['types', 'groups.types', 'groups.users.players', 'players', 'groups', 'groups.users.types'])->where('id', '=' ,$request->user()->id)->first();
    //    $user1 = User::find($user->id)->withPivot(['user_id','role_id','acive'])->get();
    //    $userFullInfo = Auth::user()->with('groups')->where('id',$user->id)->get();
    //    foreach($user1->groups as $group)  {
    //     Log::info($group->pivot);
    //    }
    $users = User::all();
       return response()->json([
           'user' => $user,
           'users' => $users
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
      
        
        // $user = User::with(['groups.types', 'groups.users.players', 'players', 'groups'])->where('id', '=' ,$request->user()->id)->first();
        // foreach ($user->groups as $group) {
          
        //     if ($group->id == $id) {
        //         Log::info($group->pivot->active);
        //         $group->pivot->active = !$group->pivot->active;
        //         $group->pivot->save();
        //     }
        // }
        // return response()->json($user);
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
}
