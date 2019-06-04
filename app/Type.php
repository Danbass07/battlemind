<?php

namespace App;
use App\Group;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Type extends Model

{
    protected $guarded = [];
    
    public function groups() {
        return $this->belongsToMany(Group::class);
    }

    public function users() {
        return $this->belongsToMany(User::class, 'hypenotizer')->withPivot('hype')->withTimestamps();
    }
}
