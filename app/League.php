<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class League extends Model
{
    protected $guarded = [];

    public function players() {
        return $this->hasMany(Player::class);
    }
}
