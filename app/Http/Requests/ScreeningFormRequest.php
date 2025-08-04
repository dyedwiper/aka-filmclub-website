<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Config;

class ScreeningFormRequest extends FormRequest
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
            'originalTitle' => 'max:255',
            'day' => 'required|date_format:Y-m-d',
            'time' => 'required|date_format:H:i',
            'synopsis' => 'max:65535',
            'directedBy' => 'max:255',
            'writtenBy' => 'max:255',
            'musicBy' => 'max:255',
            'shotBy' => 'max:255',
            'cast' => 'max:255',
            'country' => 'max:255',
            'year' => 'max:255',
            'length' => 'nullable|integer|digits_between:0,4',
            'medium' => 'max:255',
            'version' => 'max:255',
            'venue' => 'required|max:255',
            'special' => 'max:255',
            'tercet' => 'max:65535',
            'serialId' => 'nullable|integer',
            'preScreeningOf' => 'nullable|integer',
            'author' => 'max:255',
            'fskRating' => 'nullable|max:255',
            'fskDescriptors' => 'nullable|max:255',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Titel',
            'originalTitle' => 'Originaltitel',
            'day' => 'Datum',
            'time' => 'Uhrzeit',
            'synopsis' => 'Beschreibung',
            'directedBy' => 'Regie',
            'writtenBy' => 'Drehbuch',
            'musicBy' => 'Musik',
            'shotBy' => 'Kamera',
            'cast' => 'Besetzung',
            'country' => 'Produktionsländer',
            'year' => 'Erscheinungsjahr',
            'length' => 'Länge',
            'medium' => 'Medium',
            'version' => 'Sprachfassung',
            'venue' => 'Veranstaltungsort',
            'special' => 'Special',
            'tercet' => 'Dreizeiler',
            'serialId' => 'Filmreihe',
            'preScreeningOf' => 'Vorfilm zu',
            'author' => 'Autor*in',
            'fskRating' => 'FSK',
            'fskDescriptors' => 'FSK-Deskriptoren',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }
}
