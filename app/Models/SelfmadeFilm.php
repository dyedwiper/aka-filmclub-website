<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelfmadeFilm extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'updated_by',
        'title',
        'synopsis',
        'directed_by',
        'written_by',
        'music_by',
        'shot_by',
        'edited_by',
        'cast',
        'country',
        'year',
        'length',
        'source',
        'position'
    ];
}
