<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class BillingService
{
    public function addBillingFieldsToScreening($screening)
    {
        if ($screening->billing) {
            $this->addCalculatedFieldsToBilling($screening->billing);
        }
        return $screening;
    }

    public function addCalculatedFieldsToBilling($billing)
    {
        $billing->ticketsCount = $this->calculateTicketsCount($billing);
        $billing->passesCount = $this->calculatePassesCount($billing);
        $billing->earnings = $this->calculateEarnings($billing);
        $billing->ticketEarnings = $this->calculateTicketEarnings($billing);
        $billing->netTicketEarnings = $this->calculateNetTicketEarnings($billing);
        $billing->rent = $this->calculateRent($billing);
        $billing->valueAddedTax = $this->calculateValueAddedTax($billing);
        $billing->ticketTax = Config::get('constants.ticketTax');
        $billing->debt = $this->calcaluteDebt($billing);
        $billing->balance = $this->calculateBalance($billing);
    }

    public function calculateTicketsCount($billing)
    {
        $ticketStacks = $billing->ticketStacks;
        $sum = 0;
        foreach ($ticketStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }

    public function calculatePassesCount($billing)
    {
        $passStacks = $billing->passStacks;
        $sum = 0;
        foreach ($passStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }
        return $sum;
    }

    public function calculateTicketEarnings($billing)
    {
        $ticketStacks = $billing->ticketStacks;
        $ticketEarnings = 0;
        foreach ($ticketStacks as $stack) {
            $ticketEarnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }
        return $ticketEarnings;
    }

    public function calculatePassEarnings($billing)
    {
        $passStacks = $billing->passStacks;
        $passEarnings = 0;
        foreach ($passStacks as $stack) {
            $passEarnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }
        return $passEarnings;
    }

    public function calculateEarnings($billing)
    {
        return $this->calculateTicketEarnings($billing) + $this->calculatePassEarnings($billing);
    }

    public function calculateNetTicketEarnings($billing)
    {
        return $this->calculateTicketEarnings($billing)
            - $this->calculateTicketsCount($billing)
            * Config::get('constants.ticketTax');
    }

    public function calculateRent($billing)
    {
        $earnings = $this->calculateNetTicketEarnings($billing);
        $rent = $billing->percentage / 100 * $earnings;
        if ($rent < $billing->guarantee) {
            $rent = $billing->guarantee;
        }
        return $rent;
    }

    public function calculateBalance($billing)
    {
        return $this->calculateTicketEarnings($billing)
            - $this->calculateRent($billing)
            - $billing->incidentals;
    }

    public function calculateValueAddedTax($billing)
    {
        return ($this->calculateRent($billing) + $billing->incidentals) * $billing->valueAddedTaxRate / 100;
    }

    public function calcaluteDebt($billing)
    {
        return ($this->calculateRent($billing) + $billing->incidentals) * ($billing->valueAddedTaxRate + 100) / 100;
    }
}
