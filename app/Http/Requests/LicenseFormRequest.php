<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class LicenseFormRequest extends FormRequest
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
            'link' => 'max:255',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Name',
            'link' => 'Link',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
