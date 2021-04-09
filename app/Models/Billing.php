<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'screening_id',
        'screenings',
        'distributor_id',
        'confirmationNumber',
        'freeTickets',
        'guarantee',
        'percentage',
        'incidentals',
        'valueAddedTax',
        'cashInlay',
        'cashOut',
        'additionalEarnings',
        'comment',
    ];

    public function screening()
    {
        return $this->belongsTo(Screening::class);
    }

    public function distributor()
    {
        return $this->belongsTo(Distributor::class);
    }

    public function tickets()
    {
        return $this->hasMany(BillingTickets::class);
    }

    public function passes()
    {
        return $this->hasMany(BillingPasses::class);
    }
}
