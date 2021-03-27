<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Screening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    public function GetBillingsBySemester(string $semester)
    {
        $season = substr($semester, 0, 2);
        $year = intval(substr($semester, 2, 4));

        if ($season == 'WS') {
            $screenings = Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderByDesc('date')
                ->get();
            $billings = $screenings->map([$this, 'convertToBilling']);
            return $billings;
        }

        if ($season == 'SS') {
            $screenings = Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderByDesc('date')
                ->with('billing')
                ->get();
            $billings = $screenings->map([$this, 'convertToBilling']);
            return $billings;
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

    // This method must be public. Otherwise the callback does not work.
    public function convertToBilling($screening)
    {
        $billing = $screening->billing;
        $billing->soldTickets = $this->calculateTicketSum($billing);
        $billing->soldPasses = $this->calculatePassesSum($billing);
        $billing->screeningTitle = $screening->title;
        $billing->screeningDate = $screening->date;
        $billing->screeningUuid = $screening->uuid;
        // The tickets and passes fields are populated by the calculate methods. Thus they are removed here.
        // In order to call the forget method, $billing must be first turned into a collection.
        $billingCollection = collect($billing);
        $billingCollection->forget('tickets');
        $billingCollection->forget('passes');
        return $billingCollection;
    }

    private function calculateTicketSum($billing)
    {
        $ticketStacks = $billing->tickets;
        $sum = 0;
        foreach ($ticketStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }

    private function calculatePassesSum($billing)
    {
        $passStacks = $billing->passes;
        $sum = 0;
        foreach ($passStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }
}
