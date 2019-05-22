<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Type;
use App\Group;
use App\User;
class TypeController extends Controller
{
   
    
    public function index()
    {   
        $user =  Auth::user();

        $groupsJoinedByUser = Group::whereHas('users', function ($query) use ($user) {
            $query->whereKey($user->id);
        })->get();

        $types = Type::select('types.*');

  
        
        $types = Type::all();
        

      
        return response()->json(['types' => $types,
                                    'groupsJoinedByUser' => $groupsJoinedByUser,
                                    'user' => $user]);
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

    public function addToTheGroup($typeId, $groupId)
    {
        $type = \App\Type::whereId($typeId)->first();
        $group = \App\Group::whereId($groupId)->first();
         if (!$group->types->contains($type->id)) {
         $group->types()->save($type);
         }
        
       return response()->json($type); 
    }
    
}
