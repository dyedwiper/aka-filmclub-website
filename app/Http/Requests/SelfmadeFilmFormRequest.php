<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;

class SelfmadeFilmFormRequest extends FormRequest
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
            'synopsis' => 'max:65535',
            'directedBy' => 'max:255',
            'writtenBy' => 'max:255',
            'musicBy' => 'max:255',
            'shotBy' => 'max:255',
            'editedBy' => 'max:255',
            'cast' => 'max:255',
            'country' => 'max:255',
            'year' => 'max:255',
            'length' => 'nullable|integer|digits_between:0,4',
            'vimeo_id' => 'max:255',
            'position' => 'nullable|integer',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Titel',
            'synopsis' => 'Beschreibung',
            'directedBy' => 'Regie',
            'writtenBy' => 'Drehbuch',
            'musicBy' => 'Musik',
            'shotBy' => 'Kamera',
            'editedBy' => 'Schnitt',
            'cast' => 'Besetzung',
            'country' => 'Produktionsländer',
            'year' => 'Erscheinungsjahr',
            'length' => 'Länge',
            'vimeo_id' => 'Vimeo-ID',
            'position' => 'Position',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
