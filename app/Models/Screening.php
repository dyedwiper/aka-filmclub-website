<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Screening extends Model
{
    protected $fillable = [
        'uuid',
        'updated_by',
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
        'preScreeningOf',
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function serial()
    {
        return $this->belongsTo(Serial::class);
    }

    public function billing()
    {
        return $this->hasOne(Billing::class);
    }

    public function preScreenings()
    {
        return $this->hasMany(Screening::class, 'preScreeningOf');
    }

    public function mainFilm()
    {
        return $this->belongsTo(Screening::class, 'preScreeningOf');
    }
}
