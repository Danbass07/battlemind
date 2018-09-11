<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\League;

class Player extends Model
{   
    protected $guarded = [];

    
    public function user() {
            return $this->belongsTo(User::class);
    }
    public function leagues() {
        return $this->belongsToMany(League::class)->withPivot('win', 'lost', 'draw')->withTimestamps();
    }
}
