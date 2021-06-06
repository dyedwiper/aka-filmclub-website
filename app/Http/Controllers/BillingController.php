<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingFormRequest;
use App\Models\Billing;
use App\Models\PassStack;
use App\Models\Screening;
use App\Models\TicketStack;
use App\Services\BillingService;
use App\Utils\NumberUtils;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class BillingController extends Controller
{
    private $billingService;

    public function __construct(BillingService $billingService)
    {
        $this->billingService = $billingService;
    }

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
            return $screenings->map([$this->billingService, 'addBillingToScreening']);
        } elseif ($season == 'SS') {
            $screenings = Screening::select('id', 'uuid', 'title', 'date')
                ->whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderBy('date')
                ->get();
            return $screenings->map([$this->billingService, 'addBillingToScreening']);
        }
    }

    public function GetBillingByUuid(string $uuid)
    {
        $billing = Billing::where('uuid', $uuid)
            ->with('screening:id,uuid,title,date')
            ->with('distributor')
            ->with('ticketStacks', 'passStacks')
            ->first();
        $this->billingService->addCalculatedValuesToBilling($billing);
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
            'guarantee' => NumberUtils::toFloat($request->guarantee) * 100,
            'percentage' => NumberUtils::toFloat($request->percentage),
            'incidentals' => NumberUtils::toFloat($request->incidentals) * 100,
            'valueAddedTaxRate' => $request->valueAddedTaxRate,
            'cashInlay' => NumberUtils::toFloat($request->cashInlay) * 100,
            'cashOut' => NumberUtils::toFloat($request->cashOut) * 100,
            'additionalEarnings' => NumberUtils::toFloat($request->additionalEarnings) * 100,
            'comment' => $request->comment,
        ]);
        $billing->save();

        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            $ticketStack = new TicketStack([
                'billing_id' => $billing->id,
                'firstNumber' => $request->input('ticketFirst' . $i),
                'lastNumber' => $request->input('ticketLast' . $i),
                'price' => NumberUtils::toFloat($request->input('ticketPrice' . $i)) * 100,
            ]);
            $ticketStack->save();
        }

        for ($i = 0; $i < $request->numberOfPassStacks; $i++) {
            $passStack = new PassStack([
                'billing_id' => $billing->id,
                'firstNumber' => $request->input('passFirst' . $i),
                'lastNumber' => $request->input('passLast' . $i),
                'price' => NumberUtils::toFloat($request->input('passPrice' . $i)) * 100,
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
        $billing->guarantee = NumberUtils::toFloat($request->guarantee) * 100;
        $billing->percentage = NumberUtils::toFloat($request->percentage);
        $billing->incidentals = NumberUtils::toFloat($request->incidentals) * 100;
        $billing->valueAddedTaxRate = $request->valueAddedTaxRate;
        $billing->cashInlay = NumberUtils::toFloat($request->cashInlay) * 100;
        $billing->cashOut = NumberUtils::toFloat($request->cashOut) * 100;
        $billing->additionalEarnings = NumberUtils::toFloat($request->additionalEarnings) * 100;
        $billing->comment = $request->comment;

        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            if (isset($billing->ticketStacks[$i])) {
                $billing->ticketStacks[$i]->firstNumber = $request->input('ticketFirst' . $i);
                $billing->ticketStacks[$i]->lastNumber = $request->input('ticketLast' . $i);
                $billing->ticketStacks[$i]->price = NumberUtils::toFloat($request->input('ticketPrice' . $i)) * 100;
                $billing->ticketStacks[$i]->save();
            } else {
                $ticketStack = new TicketStack([
                    'billing_id' => $billing->id,
                    'firstNumber' => $request->input('ticketFirst' . $i),
                    'lastNumber' => $request->input('ticketLast' . $i),
                    'price' => NumberUtils::toFloat($request->input('ticketPrice' . $i)) * 100,
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
}
