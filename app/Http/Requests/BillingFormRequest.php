<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class BillingFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->level >= Config::get('constants.auth_level.editor');
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
            'freeTickets' => 'required|integer|digits_between:0,4',
            // The max value of 11 here and below refers to the number of characters, because the fields are evaluated as strings.
            // They can't easily be evaluated as numbers because of '.' as thousands separator and ',' as decimal separator.
            'guarantee' => 'required|regex:/\d+(,\d{1,2})?/|max:11',
            'percentage' => 'required|regex:/\d+(,\d*)?/|max:11',
            'incidentals' => 'required|regex:/\d+(,\d{1,2})?/|max:11',
            'valueAddedTaxRate' => 'required|regex:/\d+(,\d*)?/|max:11',
            'cashInlay' => 'required|regex:/\d+(,\d{1,2})?/|max:11',
            'cashOut' => 'required|regex:/\d+(,\d{1,2})?/|max:11',
            'additionalEarnings' => 'required|regex:/\d+(,\d{1,2})?/|max:11',
            'comment' => 'nullable|max:65535',
        ];

        for ($i = 0; $i < $this->numberOfTicketStacks; $i++) {
            $rules['ticketFirst' . $i] = 'required|integer|digits_between:0,11';
            $rules['ticketLast' . $i] = 'required|integer|digits_between:0,11|gte:ticketFirst' . $i;
            $rules['ticketPrice' . $i] = 'required|regex:/\d+(,\d{1,2})?/|max:11';
        }

        for ($i = 0; $i < $this->numberOfPassStacks; $i++) {
            $rules['passFirst' . $i] = 'required|integer|digits_between:0,11';
            $rules['passLast' . $i] = 'required|integer|digits_between:0,11|gte:passFirst' . $i;
            $rules['passPrice' . $i] = 'required|regex:/\d+(,\d{1,2})?/|max:11';
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
