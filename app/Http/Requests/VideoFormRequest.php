<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class VideoFormRequest extends FormRequest
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
            'description' => 'max:65,535',
            'source' => 'required|max:255',
            'position' => 'nullable|integer',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Titel',
            'description' => 'Beschreibung',
            'source' => 'Link',
            'position' => 'Position',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
