<?php

namespace App\Services;

class BillingService
{
    public function addBillingToScreening($screening)
    {
        if ($screening->billing) {
            $this->addCalculatedValuesToBilling($screening->billing);
        }
        return $screening;
    }

    public function addCalculatedValuesToBilling($billing)
    {
        $billing->ticketsCount = $this->calculateTicketsCount($billing);
        $billing->passesCount = $this->calculatePassesCount($billing);
        $billing->earnings = $this->calculateEarnings($billing);
        $billing->ticketEarnings = $this->calculateTicketEarnings($billing);
        $billing->valueAddedTaxOnTicketEarnings = $this->calculateValueAddedTaxOnTicketEarnings($billing);
        $billing->netTicketEarnings = $this->calculateNetTicketEarnings($billing);
        $billing->rent = $this->calculateRent($billing);
        $billing->valueAddedTax = $this->calculateValueAddedTax($billing);
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

    public function calculateValueAddedTaxOnTicketEarnings($billing)
    {
        return $this->calculateTicketEarnings($billing) * $billing->valueAddedTaxRate / 100;
    }

    public function calculateNetTicketEarnings($billing)
    {
        return $this->calculateTicketEarnings($billing)
            - $this->calculateTicketEarnings($billing)
            * $billing->valueAddedTaxRate / 100;
    }

    public function calculateRent($billing)
    {
        $rent = $billing->percentage / 100 * $this->calculateNetTicketEarnings($billing);
        if ($rent < $billing->guarantee) {
            $rent = $billing->guarantee;
        }
        return $rent;
    }

    public function calculateBalance($billing)
    {
        return $this->calculateTicketEarnings($billing)
            - $this->calculateRent($billing)
            - $billing->incidentals
            + $billing->additionalEarnings
            - $billing->additionalExpenses;
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
