<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $fillable = [
        'uuid',
        'updated_by',
        'screening_id',
        'distributor_id',
        'confirmationNumber',
        'freeTickets',
        'guarantee',
        'percentage',
        'incidentals',
        'spio',
        'valueAddedTaxRateOnEarnings',
        'valueAddedTaxRateOnDebt',
        'cashInlay',
        'cashOut',
        'additionalEarnings',
        'additionalExpenses',
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

    public function ticketStacks()
    {
        return $this->hasMany(TicketStack::class);
    }

    public function passStacks()
    {
        return $this->hasMany(PassStack::class);
    }
}
