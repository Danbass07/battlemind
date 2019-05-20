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
    public function __construct() {
        $this->middleware('auth');
    }
    
    public function index()
    {   
        $user =  Auth::user()->with('groups')->where('id',Auth::user()->id)->get();
        $types = Type::all();
        $groupTypes =  Group::find(1)->with('types')->get()->map(function ($item, $key) {
            return Log::info($item);
        });;

      
        return response()->json(['types' => $types,
                                    'groupTypes' => $groupTypes,
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
