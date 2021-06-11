<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'updated_by',
        'title',
        'date',
        'content',
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
