<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Player;
use App\Type;
use App\League;
use App\Scoreboard;
use App\Group;
use App\Profile;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'email', 'password',
    ];
    // protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    public function players() {
        return $this->hasMany(Player::class);
    }
    public function leagues() {
        return $this->hasMany(League::class);
    }
    public function scoreboards() {
        return $this->hasMany(Scoreboard::class);
    }
    public function groups() {
        return $this->belongsToMany(Group::class)->withPivot(['active', 'permissions']);
    }
    public function profile() {
        return $this->belongsTo(Profile::class);
    }
    public function types() {
        return $this->belongsToMany(Type::class, 'hypenotizer')->withPivot('hype')->withTimestamps();;
    }
}
