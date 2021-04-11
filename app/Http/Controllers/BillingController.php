<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingFormRequest;
use App\Models\Billing;
use App\Models\PassStack;
use App\Models\Screening;
use App\Models\TicketStack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

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
            ->with('distributor')
            ->with('ticketStacks', 'passStacks')
            ->first();
        $billing->soldTickets = $this->calculateTicketSum($billing);
        $billing->earnings = $this->calculateEarnings($billing);
        $billing->ticketEarnings = $this->calculateTicketEarnings($billing);
        $billing->rent = $this->calculateRent($billing);
        return $billing;
    }

    public function PostBilling(BillingFormRequest $request)
    {
        $billing = new Billing([
            'uuid' => uniqid(),
            'screening_id' => $request->screening_id,
            'distributor_id' => $request->distributor_id,
            'confirmationNumber' => $request->confirmationNumber,
            'freeTickets' => $request->freeTickets,
            'guarantee' => str_replace(',', '.', $request->guarantee) * 100,
            'percentage' => str_replace(',', '.', $request->percentage),
            'incidentals' => str_replace(',', '.', $request->incidentals) * 100,
            'valueAddedTax' => $request->valueAddedTax,
            'cashInlay' => str_replace(',', '.', $request->cashInlay) * 100,
            'cashOut' => str_replace(',', '.', $request->cashOut) * 100,
            'additionalEarnings' => str_replace(',', '.', $request->additionalEarnings) * 100,
            'comment' => $request->comment,
        ]);
        $billing->save();

        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            $ticketStack = new TicketStack([
                'billing_id' => $billing->id,
                'firstNumber' => $request->input('ticketFirst' . $i),
                'lastNumber' => $request->input('ticketLast' . $i),
                'price' => str_replace(',', '.', $request->input('ticketPrice' . $i)) * 100,
            ]);
            $ticketStack->save();
        }

        for ($i = 0; $i < $request->numberOfPassStacks; $i++) {
            $passStack = new PassStack([
                'billing_id' => $billing->id,
                'firstNumber' => $request->input('passFirst' . $i),
                'lastNumber' => $request->input('passLast' . $i),
                'price' => str_replace(',', '.', $request->input('passPrice' . $i)) * 100,
            ]);
            $passStack->save();
        }

        return $billing;
    }

    public function PatchBilling(BillingFormRequest $request)
    {
        $billing = Billing::where('uuid', $request->uuid)->with('ticketStacks', 'passStacks')->first();

        $billing->distributor_id = $request->distributor_id;
        $billing->confirmationNumber = $request->confirmationNumber;
        $billing->freeTickets = $request->freeTickets;
        $billing->guarantee = str_replace(',', '.', $request->guarantee) * 100;
        $billing->percentage = str_replace(',', '.', $request->percentage);
        $billing->incidentals = str_replace(',', '.', $request->incidentals) * 100;
        $billing->valueAddedTax = $request->valueAddedTax;
        $billing->cashInlay = str_replace(',', '.', $request->cashInlay) * 100;
        $billing->cashOut = str_replace(',', '.', $request->cashOut) * 100;
        $billing->additionalEarnings = str_replace(',', '.', $request->additionalEarnings) * 100;
        $billing->comment = $request->comment;

        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            if (isset($billing->ticketStacks[$i])) {
                $billing->ticketStacks[$i]->firstNumber = $request->input('ticketFirst' . $i);
                $billing->ticketStacks[$i]->lastNumber = $request->input('ticketLast' . $i);
                $billing->ticketStacks[$i]->price = str_replace(',', '.', $request->input('ticketPrice' . $i)) * 100;
                $billing->ticketStacks[$i]->save();
            } else {
                $ticketStack = new TicketStack([
                    'billing_id' => $billing->id,
                    'firstNumber' => $request->input('ticketFirst' . $i),
                    'lastNumber' => $request->input('ticketLast' . $i),
                    'price' => str_replace(',', '.', $request->input('ticketPrice' . $i)) * 100,
                ]);
                $ticketStack->save();
            }
        }

        for ($i = $request->numberOfTicketStacks; $i < count($billing->ticketStacks); $i++) {
            $billing->ticketStacks[$i]->delete();
        }

        $billing->save();
        return $billing;
    }

    public function DeleteBilling(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }

        $billing = Billing::where('uuid', $uuid)->with('ticketStacks', 'passStacks')->first();
        foreach ($billing->ticketStacks as $stack) {
            $stack->delete();
        }
        foreach ($billing->passStacks as $stack) {
            $stack->delete();
        }
        $billing->delete();
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
            // The ticketStacks and passStacks fields are populated by the calculate methods. Thus they are removed here.
            // In order to call the forget method, $billing must be first turned into a collection.
            $billingCollection = collect($billing);
            $billingCollection->forget('ticketStacks');
            $billingCollection->forget('passStacks');
            $screening->billing = $billingCollection;
        }
        return $screening;
    }

    private function calculateTicketSum($billing)
    {
        $ticketStacks = $billing->ticketStacks;
        $sum = 0;
        foreach ($ticketStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }

    private function calculatePassesSum($billing)
    {
        $passStacks = $billing->passStacks;
        $sum = 0;
        foreach ($passStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }

    private function calculateTicketEarnings($billing)
    {
        $ticketStacks = $billing->ticketStacks;
        $ticketEarnings = 0;
        foreach ($ticketStacks as $stack) {
            $ticketEarnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }
        return $ticketEarnings;
    }

    private function calculateEarnings($billing)
    {
        $earnings = $this->calculateTicketEarnings($billing);
        $passStacks = $billing->passStacks;
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
