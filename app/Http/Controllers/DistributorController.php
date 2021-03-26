<?php

namespace App\Http\Controllers;

use App\Models\Distributor;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    public function GetDistributors()
    {
        return Distributor::all();
    }

    public function GetDistributorByUuid(string $uuid)
    {
        return Distributor::firstWhere('uuid', $uuid);
    }

    
}
