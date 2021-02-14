<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ImageFormRequest extends FormRequest
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
            'image' => 'file|mimetypes:image/png,image/jpeg|max:1000',
            'altText' => 'max:255',
            'copyright' => 'max:255',
        ];
    }

    public function attributes()
    {
        return [
            'image' => 'Bild',
            'altText' => 'Alternativtext',
            'copyright' => 'Copyright',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()], 422));
    }
}
