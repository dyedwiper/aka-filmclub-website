<?php

namespace App\Http\Controllers;

use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SerialController extends Controller
{
    public function GetSerialsBySemester(string $season, int $year)
    {
        if ($season != 'ws' & $season != 'ss') {
            return response('Not a valid season identifier', 400);
        }

        $allSerials = Serial::orderByDesc('id')->get();
        $serialsFromSemester = [];
        foreach ($allSerials as $serial) {
            $firstScreening = Screening::where('serial_id', $serial->id)->orderBy('date')->first();
            if ($firstScreening == null) continue;
            $firstDate = strtotime($firstScreening->date);
            if (
                $season == 'ws'
                && (date('Y', $firstDate) == $year && date('m', $firstDate) >= 10
                    || date('Y', $firstDate) == $year + 1 && date('m', $firstDate) < 4)
            ) {
                array_push($serialsFromSemester, $serial);
            } elseif (
                $season == 'ss'
                && (date('Y', $firstDate) == $year && date('m', $firstDate) >= 4 && date('m', $firstDate) < 10)
            ) {
                array_push($serialsFromSemester, $serial);
            }
        }
        return $serialsFromSemester;
    }

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

    public function PostSerial(Request $request)
    {
        $serial = new Serial([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'article' => $request->article,
            'author' => $request->author,
        ]);
        $serial->save();
        return "Serial created with id" . $serial->id;
    }
}
