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
        'valueAddedTaxRate',
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

    public function ticketStacks()
    {
        return $this->hasMany(TicketStack::class);
    }

    public function passStacks()
    {
        return $this->hasMany(PassStack::class);
    }
}
