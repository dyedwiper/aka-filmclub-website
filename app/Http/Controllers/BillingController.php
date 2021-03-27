<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Screening;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function GetBillingsBySemester(string $semester)
    {
        $season = substr($semester, 0, 2);
        $year = intval(substr($semester, 2, 4));

        if ($season == 'WS') {
            return $screenings = Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderByDesc('date')
                ->with('billing')
                ->get();
        }

        if ($season == 'SS') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderByDesc('date')
                ->with('billing')
                ->get();
        }
    }

    public function UpdateUuids()
    {
        $billings = Billing::all();
        foreach ($billings as $billing) {
            $billing->uuid = uniqid();
            $billing->save();
        }
    }
}
