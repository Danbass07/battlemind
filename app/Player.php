<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{   
    protected $fillable = ['name'];
    protected $fillable = ['url'];
    protected $fillable = ['description'];
    protected $fillable = ['wins'];
    protected $fillable = ['lost'];
    protected $fillable = ['draws'];
    public function user() {
            return $this->belongsTo(User::class);
    }
}
