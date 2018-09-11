<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Player;

class League extends Model
{
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
}
    public function players() {
        return $this->belongsToMany(Player::class)->withPivot('win', 'lost', 'draw')->withTimestamps();
    }
}
