<?php

namespace App;
use App\Group;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    public function groups() {
        return $this->belongsToMany(Group::class);
    }
}
