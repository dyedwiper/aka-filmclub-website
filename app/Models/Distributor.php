<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distributor extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'updated_by',
        'name',
        'address',
        'zipcode',
        'city',
        'phone',
        'fax',
        'email',
        'taxId',
        'customerId',
        'accountOwner',
        'iban',
        'bic',
        'bank',
        'accountNumberOldFormat',
        'bankIdOldFormat',
    ];
}
