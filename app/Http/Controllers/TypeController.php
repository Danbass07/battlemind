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
   
    
    public function index(Request $request )
    {   
        $user = User::with(['groups.types.users', 'groups',])->where('id', '=' ,$request->user()->id)->first();
        $userGroups = $user->groups->load('types.users');
        $userTypes =  $userGroups->pluck('types')->collapse()->unique('id')->flatten();

        $userTypes->map(function ($type) use ($user) {
           
            return $type->users->map(function ($typeuser) use ($user,  $type) {
                          
                 if ($typeuser->id === $user->id) {
                  return   $type->type = $typeuser->pivot->hype;
                 }
               
             
         });
        });
        $allTypes = Type::all()->unique();

         return response()->json([ 
             'user' => $user,
             'userTypes' => $userTypes,
             'allTypes' => $allTypes,
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
       
        $type = new Type;
        $type->type = $request->type;
        $type->group_id = $request->groupId;
        $type->save();

        $group = Group::find($request->groupId);
        Log::info($group->users);
            foreach ($group->users as $user) {
                $user->types()->save($type);
                $user->types()->updateExistingPivot($type->id, ['hype' => 2]);
            }
            return;
           
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

    public function userTypes($id)
    
    {  
        $user =  Auth::user();
        $group = \App\Group::where('id', '=' ,$id)->with('types.users')->first();
        $types = $group->types->load('users');
        foreach ($types as $type) {
         
            $type->users->filter(function ($typeuser) use ($type, $user) {
     
                    if ($typeuser->id === $user->id) {
                        $type->hype = $typeuser->pivot->hype;
                        } 
                       
                    
                      return $type;
                });
                
            
           

        }
  
        
       return response()->json($types); 
    }
    // public function hypecheck($groupId) {

    //     $user =  Auth::user();
    //     $group = \App\Group::whereId($groupId)->with(['types.users','users.types'])->first();
        
    //     return response()->json([ 'group' => $group]);

    // }
    
}
