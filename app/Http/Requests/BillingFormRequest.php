<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class BillingFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'distributor_id' => 'nullable|integer',
            'confirmationNumber' => 'nullable|max:255',
            'freeTickets' => 'required|integer',
            'guarantee' => 'required|regex:/\d+(,\d{1,2})?/',
            'percentage' => 'required|regex:/\d+(,\d*)?/',
            'incidentals' => 'required|regex:/\d+(,\d{1,2})?/',
            'valueAddedTaxRate' => 'required|regex:/\d+(,\d*)?/',
            'cashInlay' => 'required|regex:/\d+(,\d{1,2})?/',
            'cashOut' => 'required|regex:/\d+(,\d{1,2})?/',
            'additionalEarnings' => 'required|regex:/\d+(,\d{1,2})?/',
            'comment' => 'nullable|max:65535',
        ];

        for ($i = 0; $i < $this->numberOfTicketStacks; $i++) {
            $rules['ticketFirst' . $i] = 'required|integer';
            $rules['ticketLast' . $i] = 'required|integer|gte:ticketFirst' . $i;
            $rules['ticketPrice' . $i] = 'required|regex:/\d+(,\d{1,2})?/';
        }

        for ($i = 0; $i < $this->numberOfPassStacks; $i++) {
            $rules['passFirst' . $i] = 'required|integer';
            $rules['passLast' . $i] = 'required|integer|gte:passFirst' . $i;
            $rules['passPrice' . $i] = 'required|regex:/\d+(,\d{1,2})?/';
        }

        return $rules;
    }

    public function attributes()
    {
        $attributes = [
            'distributor_id' => 'Verleih',
            'confirmationNumber' => 'Terminbestätigungs-Nr.',
            'freeTickets' => 'Freikarten',
            'guarantee' => 'Mindestgarantie',
            'percentage' => 'Prozentsatz',
            'incidentals' => 'Nebenkosten',
            'valueAddedTaxRate' => 'Mehrwertsteuersatz',
            'cashInlay' => 'Kasseneinlage',
            'cashOut' => 'Kassenauslage',
            'additionalEarnings' => 'Sonstige Einnahmen/Ausgaben',
            'comment' => 'Kommentar',
        ];

        for ($i = 0; $i < $this->numberOfTicketStacks; $i++) {
            $attributes['ticketFirst' . $i] = 'Kartenstapel ' . ($i + 1) . ' von';
            $attributes['ticketLast' . $i] = 'Kartenstapel ' . ($i + 1) . ' bis';
            $attributes['ticketPrice' . $i] = 'Kartenstapel ' . ($i + 1) . ' à';
        }

        for ($i = 0; $i < $this->numberOfPassStacks; $i++) {
            $attributes['passFirst' . $i] = 'Ausweisstapel ' . ($i + 1) . ' von';
            $attributes['passLast' . $i] = 'Ausweisstapel ' . ($i + 1) . ' bis';
            $attributes['passPrice' . $i] = 'Ausweisstapel ' . ($i + 1) . ' à';
        }

        return $attributes;
    }


    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
