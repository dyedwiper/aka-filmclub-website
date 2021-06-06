<?php

namespace App\Http\Controllers;

use App\Http\Requests\LicenseFormRequest;
use App\Models\License;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class LicenseController extends Controller
{
    public function GetLicenses()
    {
        return License::orderBy('name')->get();
    }

    public function GetLicenseByUuid(string $uuid)
    {
        return License::firstWhere('uuid', $uuid);
    }

    public function PostLicense(LicenseFormRequest $request)
    {
        $license = new License(['uuid' => uniqid(),]);
        $license = $this->mapRequestToLicense($request, $license);
        $license->save();
        return $license;
    }

    public function PatchLicense(LicenseFormRequest $request)
    {
        $license = License::firstWhere('uuid', $request->uuid);
        $license = $this->mapRequestToLicense($request, $license);
        $license->save();
        return $license;
    }

    public function DeleteLicense(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $license = License::firstWhere('uuid', $uuid);
        $license->delete();
    }

    private function mapRequestToLicense(Request $request, License $license)
    {
        $license->updated_by = $request->updated_by;
        $license->name = $request->name;
        $license->link = $request->link;

        return $license;
    }
}
