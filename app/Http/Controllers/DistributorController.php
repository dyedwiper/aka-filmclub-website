<?php

namespace App\Http\Controllers;

use App\Http\Requests\DistributorFormRequest;
use App\Models\Distributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

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

    public function PostDistributor(DistributorFormRequest $request)
    {
        $distributor = new Distributor([
            'uuid' => uniqid(),
            'name' => $request->name,
            'address' => $request->address,
            'zipcode' => $request->zipcode,
            'city' => $request->city,
            'phone' => $request->phone,
            'fax' => $request->fax,
            'email' => $request->email,
            'taxId' => $request->taxId,
            'customerId' => $request->customerId,
            'accountOwner' => $request->accountOwner,
            'iban' => $request->iban,
            'bic' => $request->bic,
            'bank' => $request->bank,
            'accountNumberOldFormat' => $request->accountNumberOldFormat,
            'bankIdOldFormat' => $request->bankIdOldFormat,
        ]);
        $distributor->save();
        return $distributor;
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

    public function DeleteDistributor(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $distributor = Distributor::firstWhere('uuid', $uuid);
        $distributor->delete();
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
