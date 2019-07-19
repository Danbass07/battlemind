<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;

class VoteController extends Controller
{
    public function setUpVote(Request $request)
    {
        $vote = new Vote;
        $vote = Vote::create([
            'active' => $request->active,
            'stage' => $request->stage,
            'results' => $request->results,
        ]);
           
        return response()->json($vote->results);
    }
}
