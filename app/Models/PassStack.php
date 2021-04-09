<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PassStack extends Model
{
    use HasFactory;

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
