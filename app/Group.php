<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Group extends Model
{
    protected $fillable = [
        'name', 'info',
    ];
    public function users() {
        return $this->belongsToMany(User::class, 'group_user')->withTimestamps();
    }
}
