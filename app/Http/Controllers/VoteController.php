<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;
use App\Group;

class VoteController extends Controller
{   
    public function votecheck (Request $request, $id)
    {
        $group= Group::find($id);
        $vote = $group->votes->where('active','=',true)->first();

           
        return response()->json($vote);
    }
    public function setUpVote(Request $request)
    {
        $vote = new Vote;
        $vote = Vote::create([
            'data' => $request->data,
            'stage' => 2,
            'group_id' => $request->group_id,
            'active' => true,
       
        ]);
           
        return response()->json($vote->results);
    }
}
