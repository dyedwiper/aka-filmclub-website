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
        $billing->valueAddedTaxOnEarnings = $this->calculateValueAddedTaxOnTicketEarnings($billing);
        $billing->netTicketEarnings = $this->calculateNetTicketEarnings($billing);
        $billing->rent = $this->calculateRent($billing);
        $billing->valueAddedTaxOnDebt = $this->calculateValueAddedTaxOnDebt($billing);
        $billing->debt = $this->calcaluteDebt($billing);
        $billing->balance = $this->calculateBalance($billing);
    }

    private function calculateTicketsCount($billing)
    {
        $ticketStacks = $billing->ticketStacks;
        $sum = 0;
        foreach ($ticketStacks as $stack) {
            $sum += $stack->lastNumber - $stack->firstNumber + 1;
        }

        return $sum;
    }

    private function calculatePassesCount($billing)
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

    private function calculatePassEarnings($billing)
    {
        $passStacks = $billing->passStacks;
        $passEarnings = 0;
        foreach ($passStacks as $stack) {
            $passEarnings += ($stack->lastNumber - $stack->firstNumber + 1) * $stack->price;
        }

        return $passEarnings;
    }

    private function calculateEarnings($billing)
    {
        $earnings = $this->calculateTicketEarnings($billing) + $this->calculatePassEarnings($billing);

        return $earnings;
    }

    private function calculateNetTicketEarnings($billing)
    {
        $net = $this->calculateTicketEarnings($billing) / (1 + $billing->valueAddedTaxRateOnEarnings / 100);
        $roundedNet = round($net);

        return $roundedNet;
    }

    private function calculateValueAddedTaxOnTicketEarnings($billing)
    {
        $vat = $this->calculateTicketEarnings($billing) - $this->calculateNetTicketEarnings($billing);

        return $vat;
    }

    private function calculateRent($billing)
    {
        $rent = ($billing->percentage / 100) * $this->calculateNetTicketEarnings($billing);
        if ($rent < $billing->guarantee) {
            $rent = $billing->guarantee;
        }

        return $rent;
    }

    private function calculateBalance($billing)
    {
        $balance =
            $this->calculateTicketEarnings($billing) -
            $this->calculateRent($billing) -
            $billing->incidentals +
            $billing->spio +
            $billing->additionalEarnings -
            $billing->additionalExpenses;

        return $balance;
    }

    private function calculateValueAddedTaxOnDebt($billing)
    {
        $vat =
            (($this->calculateRent($billing) + $billing->incidentals + $billing->spio) *
                $billing->valueAddedTaxRateOnDebt) /
            100;
        $roundedVat = round($vat);

        return $roundedVat;
    }

    private function calcaluteDebt($billing)
    {
        $debt =
            $this->calculateRent($billing) +
            $billing->incidentals +
            $billing->spio +
            $this->calculateValueAddedTaxOnDebt($billing);
        $roundedDebt = round($debt);

        return $roundedDebt;
    }
}
