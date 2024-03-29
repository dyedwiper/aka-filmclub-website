<?php

namespace App\Services;

use App\Models\Screening;

class ScreeningService
{
    public function getScreeningsForSemester(string $semester)
    {
        $season = substr($semester, 0, 2);
        $year = intval(substr($semester, 2, 4));

        if ($season == 'WS') {
            return Screening::select('id', 'uuid', 'title', 'date', 'special')
                ->whereNull('preScreeningOf')
                ->whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderBy('date')
                ->with('preScreenings:preScreeningOf,uuid,title')
                ->get();
        }

        if ($season == 'SS') {
            return Screening::select('id', 'uuid', 'title', 'date', 'special')
                ->whereNull('preScreeningOf')
                ->whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderBy('date')
                ->with('preScreenings:preScreeningOf,uuid,title')
                ->get();
        }
    }
}
