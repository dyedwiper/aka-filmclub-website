<?php

namespace App\Http\Controllers;

use App\Models\Distributor;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    public function GetDistributors()
    {
        return Distributor::orderBy('name')->get();
    }

    public function GetDistributorByUuid(string $uuid)
    {
        return Distributor::firstWhere('uuid', $uuid);
    }

    public function UpdateUuids()
    {
        $distributors = Distributor::all();
        foreach ($distributors as $distributor) {
            $distributor->uuid = uniqid();
            $distributor->save();
        }
    }
}
