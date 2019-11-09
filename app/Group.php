<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Type;
use App\User;
use App\Vote;
use App\Event;

class Group extends Model
{
    // protected $fillable = [
    //     'name', 'info',
    // ];
    protected $guarded = [];
    public function users() {
        return $this->belongsToMany(User::class)->withPivot(['active', 'permissions']);
    }
    public function types() {
        return $this->hasMany(Type::class);
        
    }
    public function votes() {
        return $this->hasMany(Vote::class);
    }
    public function events() {
        return $this->hasMany(Event::class);
    }
}
