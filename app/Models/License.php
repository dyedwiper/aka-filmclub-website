<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    protected $fillable = ['uuid', 'updated_by', 'name', 'link'];
}
