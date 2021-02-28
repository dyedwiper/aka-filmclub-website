<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->level == 2;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|alpha|max:32',
            'realname' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'max:255',
            'address' => 'max:255',
            'zipcode' => 'nullable|integer',
            'city' => 'max:255',
            'level' => 'required|integer',
            'status' => 'required|integer',
        ];
    }

    public function attributes()
    {
        return [
            'username' => 'Login',
            'realname' => 'Name',
            'email' => 'E-Mail-Adresse',
            'phone' => 'Telefonnummer',
            'address' => 'Adresse',
            'zipcode' => 'Postleitzahl',
            'city' => 'Stadt',
            'level' => 'Berechtigungslevel',
            'status' => 'Status',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
