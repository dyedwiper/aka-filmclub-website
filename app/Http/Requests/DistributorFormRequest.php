<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class DistributorFormRequest extends FormRequest
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
        return [
            'name' => 'required|max:255',
            'address' => 'max:255',
            'zipcode' => 'max:15',
            'city' => 'max:255',
            'phone' => 'max:255',
            'fax' => 'max:255',
            'email' => 'nullable|email|max:255',
            'taxId' => 'max:255',
            'customerId' => 'max:255',
            'accountOwner' => 'max:255',
            'iban' => 'max:255',
            'bic' => 'max:255',
            'bank' => 'max:255',
            'accountNumberOldFormat' => 'max:255',
            'bankIdOldFormat' => 'max:255',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Name',
            'address' => 'Adresse',
            'zipcode' => 'Postleitzahl',
            'city' => 'Stadt',
            'phone' => 'Telefonnummer',
            'fax' => 'Faxnummer',
            'email' => 'E-Mail-Adresse',
            'taxId' => 'Steuernummer',
            'customerId' => 'Unsere Kundennummer',
            'accountOwner' => 'Kontoinhaber',
            'iban' => 'IBAN',
            'bic' => 'BIC',
            'bank' => 'Name der Bank',
            'accountNumberOldFormat' => 'Kontonummer (altes Format)',
            'bankIdOldFormat' => 'Bankleitzahl (altes Format)',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
