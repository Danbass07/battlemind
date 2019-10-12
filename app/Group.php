<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Type;
use App\User;

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
}
