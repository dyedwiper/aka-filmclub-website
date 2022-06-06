<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingFormRequest;
use App\Models\Billing;
use App\Models\PassStack;
use App\Models\TicketStack;
use App\Services\BillingService;
use App\Services\ScreeningService;
use App\Utils\NumberUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class BillingController extends Controller
{
    private $billingService;
    private $screeningService;

    public function __construct(BillingService $billingService, ScreeningService $screeningService)
    {
        $this->billingService = $billingService;
        $this->screeningService = $screeningService;
    }

    public function GetScreeningsWithBillingsBySemester(string $semester)
    {
        $screenings = $this->screeningService->getScreeningsForSemester($semester);
        return $screenings->map([$this->billingService, 'addBillingToScreening']);
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
        ]);
        $billing = $this->mapRequestToBilling($request, $billing);
        $billing->save();

        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            $ticketStack = new TicketStack(['billing_id' => $billing->id,]);
            $ticketStack = $this->mapRequestToTicketStack($request, $ticketStack, $i);
            $ticketStack->save();
        }

        for ($i = 0; $i < $request->numberOfPassStacks; $i++) {
            $passStack = new PassStack(['billing_id' => $billing->id,]);
            $passStack = $this->mapRequestToPassStack($request, $passStack, $i);
            $passStack->save();
        }

        return $billing;
    }

    public function PatchBilling(BillingFormRequest $request)
    {
        $billing = Billing::where('uuid', $request->uuid)->with('ticketStacks', 'passStacks')->first();
        $billing = $this->mapRequestToBilling($request, $billing);

        $this->updateTicketStacks($request, $billing);
        $this->updatePassStacks($request, $billing);

        $billing->save();
        return $billing;
    }

    public function DeleteBilling(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(403);
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

    private function mapRequestToBilling(Request $request, Billing $billing)
    {
        $billing->updated_by = $request->updated_by;
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

        return $billing;
    }

    private function mapRequestToTicketStack(Request $request, TicketStack $ticketStack, int $stackNumber)
    {
        $ticketStack->firstNumber = $request->input('ticketFirst' . $stackNumber);
        $ticketStack->lastNumber = $request->input('ticketLast' . $stackNumber);
        $ticketStack->price = NumberUtils::toFloat($request->input('ticketPrice' . $stackNumber)) * 100;

        return $ticketStack;
    }

    private function mapRequestToPassStack(Request $request, PassStack $passStack, int $stackNumber)
    {
        $passStack->firstNumber = $request->input('passFirst' . $stackNumber);
        $passStack->lastNumber = $request->input('passLast' . $stackNumber);
        $passStack->price = NumberUtils::toFloat($request->input('passPrice' . $stackNumber)) * 100;

        return $passStack;
    }

    private function updateTicketStacks(Request $request, Billing $billing)
    {
        for ($i = 0; $i < $request->numberOfTicketStacks; $i++) {
            if (isset($billing->ticketStacks[$i])) {
                $ticketStack = $billing->ticketStacks[$i];
                $ticketStack = $this->mapRequestToTicketStack($request, $ticketStack, $i);
                $ticketStack->save();
            } else {
                $ticketStack = new TicketStack(['billing_id' => $billing->id,]);
                $ticketStack = $this->mapRequestToTicketStack($request, $ticketStack, $i);
                $ticketStack->save();
            }
        }

        for ($i = $request->numberOfTicketStacks; $i < count($billing->ticketStacks); $i++) {
            $billing->ticketStacks[$i]->delete();
        }
    }

    private function updatePassStacks(Request $request, Billing $billing)
    {
        for ($i = 0; $i < $request->numberOfPassStacks; $i++) {
            if (isset($billing->passStacks[$i])) {
                $passStack = $billing->passStacks[$i];
                $passStack = $this->mapRequestToPassStack($request, $passStack, $i);
                $passStack->save();
            } else {
                $passStack = new PassStack(['billing_id' => $billing->id,]);
                $passStack = $this->mapRequestToPassStack($request, $passStack, $i);
                $passStack->save();
            }
        }

        for ($i = $request->numberOfPassStacks; $i < count($billing->passStacks); $i++) {
            $billing->passStacks[$i]->delete();
        }
    }
}
