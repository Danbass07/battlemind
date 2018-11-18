<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Player;
use App\User;

class Scoreboard extends Model
{
    protected $guarded = [];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function players() {
        return $this->belongsToMany(Player::class, 'scoreboard_player')->withPivot('win', 'lost', 'draw')->withTimestamps();
    }
}
