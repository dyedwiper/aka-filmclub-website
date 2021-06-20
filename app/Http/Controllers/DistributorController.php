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
        $distributor = new Distributor(['uuid' => uniqid(),]);
        $distributor = $this->mapRequestToDistributor($request, $distributor);
        $distributor->save();
        return $distributor;
    }

    public function PatchDistributor(DistributorFormRequest $request)
    {
        $distributor = Distributor::firstWhere('uuid', $request->uuid);
        $distributor = $this->mapRequestToDistributor($request, $distributor);
        $distributor->save();
        return $distributor;
    }

    public function DeleteDistributor(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(403);
        }
        $distributor = Distributor::firstWhere('uuid', $uuid);
        $distributor->delete();
    }

    // This function is only used during migration from the old website. It can be deleted afterwards.
    public function UpdateUuids()
    {
        $distributors = Distributor::all();
        foreach ($distributors as $distributor) {
            $distributor->uuid = uniqid();
            $distributor->save();
        }
    }

    private function mapRequestToDistributor(Request $request, Distributor $distributor)
    {
        $distributor->updated_by = $request->updated_by;
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

        return $distributor;
    }
}
