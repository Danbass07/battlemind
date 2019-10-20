<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $guarded = [];
    
    public function group() {
        return $this->belongsTo(Group::class);
    }
}
