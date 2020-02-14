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

           
        return response()->json([
            'activeVoteDetails' => $vote,
             ]);
    }
    public function setUpVote(Request $request)
    {
        $group= Group::find($request->group_id);
        $vote = $group->votes->where('active','=',true)->first();
        if (!$vote) {
            $status = true;
            $vote = new Vote;
            $vote = Vote::create([
                'data' => $request->data,
                'stage' => 1,
                'group_id' => $request->group_id,
                'active' => true,
           
            ]);
            $vote = $group->votes->where('active','=',true)->first();
            }
        
    
           
        return response()->json([
            'activeVoteDetails' => $vote,
             ]);
    }
    public function voteclose ($id) {
        $status = false;
        $group= Group::find($id);
        $vote = $group->votes->where('active','=',true)->first();
        if($vote) {
            $status = true;
            $vote->active = false;
            $vote->save();
        }
 

        return response()->json([ 'status' => $status]);
    }
    public function castvote (Request $request, $id)
    {
        $group= Group::find($id);
        $vote = $group->votes->where('active','=',true)->first();
        $vote->data = $request->voteData;
        $vote->save();
           
        return;
    }
    public function votecheckk (Request $request, $id)
    {
       
        $vote = $group->votes->where('active','=',true)->first();

           
        return response()->json([
            'activeVoteDetails' => $vote,
             ]);
    }
}
