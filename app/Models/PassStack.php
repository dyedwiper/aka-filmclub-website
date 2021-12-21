<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PassStack extends Model
{
    protected $fillable = [
        'billing_id',
        'firstNumber',
        'lastNumber',
        'price',
    ];

    public function billing()
    {
        return $this->belongsTo(Billing::class);
    }
}
