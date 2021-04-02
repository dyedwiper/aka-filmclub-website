<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Screening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    public function GetScreeningsWithBillingsBySemester(string $semester)
    {
        $season = substr($semester, 0, 2);
        $year = intval(substr($semester, 2, 4));

        if ($season == 'WS') {
            $screenings = Screening::select('id', 'uuid', 'title', 'date')
                ->whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderBy('date')
                ->get();
            return $screenings->map([$this, 'addCalculatedFieldsToBilling']);
        } elseif ($season == 'SS') {
            $screenings = Screening::select('id', 'uuid', 'title', 'date')
                ->whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderBy('date')
                ->get();
            return $screenings->map([$this, 'addCalculatedFieldsToBilling']);
        }
    }

    public function GetBillingByUuid(string $uuid)
    {
        $billing = Billing::where('uuid', $uuid)
            ->with('screening:id,uuid,title,date')
            ->with('tickets', 'passes')
            ->first();
        $billing->earnings = $this->calculateEarnings($billing);
        $billing->ticketEarnings = $this->calculateTicketEarnings($billing);
        $billing->rent = $this->calculateRent($billing);
        return $billing;
    }

    public function UpdateUuids()
    {
        $billings = Billing::all();
        foreach ($billings as $billing) {
            $billing->uuid = uniqid();
            $billing->save();
        }
    }

    //---------------------------------------------//
    // Below are service methods which don't belong to a route.

    // This method must be public. Otherwise the callback does not work.
    public function addCalculatedFieldsToBilling($screening)
    {
        if ($screening->billing) {
            $billing = $screening->billing;
            $billing->soldTickets = $this->calculateTicketSum($billing);
            $billing->soldPasses = $this->calculatePassesSum($billing);
            $billing->earnings = $this->calculateEarnings($billing);
            $billing->rent = $this->calculateRent($billing);
            $billing->profit = $this->calculateProfit($billing);
            // The tickets and passes fields are populated by the calculate methods. Thus they are removed here.
            // In order to call the forget method, $billing must be first turned into a collection.
            $billingCollection = collect($billing);
            $billingCollection->forget('tickets');
            $billingCollection->forget('passes');
            $screening->billing = $billingCollection;
        }
        return $screening;
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

    private function calculateTicketEarnings($billing)
    {
        $ticketStacks = $billing->tickets;
        $ticketEarnings = 0;
        foreach ($ticketStacks as $stack) {
            $ticketEarnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }
        return $ticketEarnings;
    }

    private function calculateEarnings($billing)
    {
        $earnings = $this->calculateTicketEarnings($billing);
        $passStacks = $billing->passes;
        foreach ($passStacks as $stack) {
            $earnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }
        return $earnings;
    }

    public function calculateRent($billing)
    {
        $earnings = $this->calculateTicketEarnings($billing);
        $rent = $billing->percentage / 100 * $earnings;
        if ($rent < $billing->guarantee) {
            $rent = $billing->guarantee;
        }
        $rent += $billing->incidentals;
        return round($rent);
    }

    private function calculateProfit($billing)
    {
        return ($this->calculateTicketEarnings($billing) - $this->calculateRent($billing));
    }
}
