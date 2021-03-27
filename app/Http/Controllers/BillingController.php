<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function UpdateUuids()
    {
        $billings = Billing::all();
        foreach ($billings as $billing) {
            $billing->uuid = uniqid();
            $billing->save();
        }
    }
}
