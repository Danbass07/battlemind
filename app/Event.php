<?php

namespace App;
use App\Group;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function group() {
        return $this->belongsTo(User::class);
    }
}
