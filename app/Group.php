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
        return $this->belongstoMany(User::class);
    }
}
