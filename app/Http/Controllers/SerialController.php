<?php

namespace App\Http\Controllers;

use App\Models\Serial;
use Illuminate\Http\Request;

class SerialController extends Controller
{
    public function GetSerialByUuid(string $uuid)
    {
        return Serial::where('uuid', $uuid)->first();
    }

    public function UpdateUuids()
    {
        $serials = Serial::all();
        foreach ($serials as $serial) {
            $serial->uuid = uniqid();
            $serial->save();
        }
    }
}
