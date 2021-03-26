<?php

namespace App\Http\Controllers;

use App\Http\Requests\DistributorFormRequest;
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

    public function PatchDistributor(DistributorFormRequest $request)
    {
        $distributor = Distributor::firstWhere('uuid', $request->uuid);

        $distributor->name = $request->name;
        $distributor->address = $request->address;
        $distributor->zipcode = $request->zipcode;
        $distributor->city = $request->city;
        $distributor->email = $request->email;
        $distributor->phone = $request->phone;
        $distributor->fax = $request->fax;
        $distributor->taxId = $request->taxId;
        $distributor->customerId = $request->customerId;
        $distributor->accountOwner = $request->accountOwner;
        $distributor->iban = $request->iban;
        $distributor->bic = $request->bic;
        $distributor->bank = $request->bank;
        $distributor->accountNumberOldFormat = $request->accountNumberOldFormat;
        $distributor->bankIdOldFormat = $request->bankIdOldFormat;

        $distributor->save();
        return $distributor;
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
