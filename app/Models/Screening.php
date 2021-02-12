<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'original_title',
        'synopsis',
        'directed_by',
        'written_by',
        'music_by',
        'shot_by',
        'cast',
        'country',
        'year',
        'length',
        'medium',
        'version',
        'venue',
        'special',
        'tercet',
        'author',
        'serial_id',
        'image_id',
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
