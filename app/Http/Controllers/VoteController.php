<?php

namespace App\Http\Controllers;

use App\Group;
use App\User;
use App\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function show($id)
    {

    }
    public function votecheck(Request $request, $id)
    {
        $group = Group::find($id);
        $vote = $group->votes->where('active', '=', true)->first();
        if (!$vote) {
            $vote = $group->votes->last();
        }
        return response()->json([
            'activeVoteDetails' => $vote,
        ]);
    }
    public function setUpVote(Request $request)
    {
        $group = Group::find($request->group_id);
        $vote = $group->votes->where('active', '=', true)->first();
        if (!$vote) {
            $status = true;
            $vote = new Vote;
            $vote = Vote::create([
                'data' => $request->data,
                'stage' => 1,
                'group_id' => $request->group_id,
                'active' => true,

            ]);
            $vote = $group->votes->where('active', '=', true)->first();
        }

        return response()->json([
            'activeVoteDetails' => $vote,
        ]);
    }
    public function voteclose($id)
    {
        $status = false;
        $group = Group::find($id);
        $vote = $group->votes->where('active', '=', true)->first();
        $winner = false;

        if ($vote) {
            $voteData = json_decode($vote->data);
            usort($voteData, function ($a, $b) {
                return count($a->votersId) < count($b->votersId) ? 1 : -1;
            });
            if (count($voteData[0]->votersId) !== count($voteData[1]->votersId)) {
                $voteData[0]->winner = true;
                $winner = true;

            } else {
                $candidates = [];
                foreach ($voteData as $candidate) {
                    if (count($candidate->votersId) === count($voteData[0]->votersId)) {
                        array_push($candidates, $candidate);
                    }
                }

                $candidates_with_win = [];
                foreach ($candidates as $candidate) {
                    foreach ($group->votes as $past_vote) {
                        $past_vote_data = json_decode($past_vote->data);

                        foreach ($past_vote_data as $past_candidate) {
                            if ($past_candidate->winner && $past_candidate->id === $candidate->id) {
                                $past_candidate->last_win = $past_vote->created_at;
                                array_push($candidates_with_win, $past_candidate);

                            }
                        }

                    }

                }
                usort($candidates_with_win, function ($a, $b) {
                    return $a->last_win < $b->last_win ? 1 : -1;
                });
                foreach ($voteData as $candidate) {
                    if (count($candidates_with_win) > 0 && $candidate->id === $candidates_with_win[0]->id) {
                        $candidate->winner = true;
                        $winner = true;
                    }
                }

                if (!$winner) {
                    $rand = rand(0, count($candidates) - 1);
                    $candidates[$rand]->winner = true;
                    $winner = true;
                }

            }

            $vote->data = json_encode($voteData);

            $status = true;
            $vote->active = false;
            $vote->save();
        }

        return response()->json(['vote' => $vote]);
    }
    public function castvote(Request $request, $id)
    {
        $group = Group::find($id);
        $vote = $group->votes->where('active', '=', true)->first();
        $voteData = json_decode($vote->data);
        $userId = $request->userId;
        $voteCount = 0;
        foreach ($voteData as $key => $candidate) {

            foreach ($candidate->votersId as $voterKey => $voteId) {

                if ($voteId == $userId && $request->typeId === $candidate->id) {

                    $voteCount += 1;
                }

            }

            if ($request->typeId === $candidate->id && $voteCount === 0) {
                array_push($candidate->votersId, strval($request->userId));
                $vote->data = json_encode($voteData);

                $vote->save();
            }
            if ($request->typeId === $candidate->id && $voteCount !== 0) {
                unset($candidate->votersId[$voterKey]);
                $vote->data = json_encode($voteData);

                $vote->save();
            }

        }

        return response($voteData);
    }
    public function votecheckk()
    {
        $user = Auth::user();
        $data = User::with(['groups.votes'])->where('id', '=', $user->id)->first();

        return response()->json([
            'user' => $data,
        ]);
    }
}
