<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Vote;
use App\Group;
use App\User;

class VoteController extends Controller
{   
    public function show($id)
    {
    
    }
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
    public function votecheckk ()
    {
         $user =  Auth::user();
        $data = User::with(['groups.votes'])->where('id', '=' ,$user->id)->first();

           
        return response()->json([
            'user' => $data,
             ]);
    }
}
