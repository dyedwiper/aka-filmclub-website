<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serial extends Model
{
    use HasFactory;

    protected $fillable = ['uuid', 'title', 'subtitle', 'article', 'author', 'semester'];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function screenings()
    {
        return $this->hasMany(Screening::class);
    }
}
