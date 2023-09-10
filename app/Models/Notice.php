<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $fillable = ['uuid', 'updated_by', 'title', 'date', 'content'];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
