<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Config;

class SerialFormRequest extends FormRequest
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
            'title' => 'required|max:255',
            'subtitle' => 'max:255',
            'article' => 'required|max:65535',
            'author' => 'required|max:255',
            'semester' => 'required|regex:/^[WS]S\d{4}$/',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Titel',
            'subtitle' => 'Untertitel',
            'article' => 'Reihenartikel',
            'author' => 'Autor*in',
            'semester' => 'Semester',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
