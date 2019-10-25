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
        $group= Group::find($request->group_id);
        $vote = $group->votes->where('active','=',true)->first();
        if (!$vote) {
            $vote = new Vote;
            $vote = Vote::create([
                'data' => $request->data,
                'stage' => 1,
                'group_id' => $request->group_id,
                'active' => true,
           
            ]);
        }
    
           
        return response()->json($vote->results);
    }
    public function voteclose ($id) {
        $group= Group::find($id);
        $vote = $group->votes->where('active','=',true)->first();
        if($vote) {
            $vote->active = false;
            $vote->save();
        }
 

        return response('success');
    }
}
