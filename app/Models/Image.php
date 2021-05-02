<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'path',
        'alt_text',
        'copyright',
        'license',
    ];

    public function screening()
    {
        return $this->hasOne(Screening::class);
    }

    public function serial()
    {
        return $this->hasOne(Serial::class);
    }

    public function notice()
    {
        return $this->hasOne(Notice::class);
    }

    public function license()
    {
        return $this->belongsTo(License::class);
    }
}
