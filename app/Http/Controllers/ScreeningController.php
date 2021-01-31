<?php

namespace App\Http\Controllers;

use App\Models\Screening;
use Illuminate\Http\Request;

class ScreeningController extends Controller
{
    public function GetFutureScreenings()
    {
        return Screening::where('date', '>', date("Y-m-d H:i:s"))->get();
    }

    public function GetSingleScreening(string $uuid)
    {
        return Screening::where('uuid', $uuid)->first();
    }

    public function GetScreeningsByYear(int $year)
    {
        return Screening::whereYear('date', $year)->get();
    }

    public function GetScreeningsBySemester(string $semester, int $year)
    {
        if ($semester != 'ws' & $semester != 'ss') {
            return response('Not a valid semester identifier', 400);
        }

        if ($semester == 'ws') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderBy('date')
                ->get();
        }

        if ($semester == 'ss') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderBy('date')
                ->get();
        }
    }

    public function UpdateUuids()
    {
        $screenings = Screening::all();
        foreach ($screenings as $screening) {
            $screening->uuid = uniqid();
            $screening->save();
        }
    }
}
