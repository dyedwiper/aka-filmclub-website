<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ScreeningFormRequest extends FormRequest
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
            'year' => 'integer',
            'length' => 'integer',
            'medium' => 'max:255',
            'version' => 'max:255',
            'venue' => 'max:255',
            'special' => 'max:65535',
            'tercet' => 'max:65535',
            'serialId' => 'integer',
            'author' => 'max:255',
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
            'author' => 'Autor*in',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()], 422));
    }
}
