<?php

namespace App\Http\Requests;

use App\Utils\ValidationUtils;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Config;

class ImageFormRequest extends FormRequest
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
        return self::$ValidationRules;
    }

    public function attributes()
    {
        return self::$ValidationAttributes;
    }

    protected function failedValidation(Validator $validator)
    {
        ValidationUtils::handleValidationError($validator);
    }

    // Rules and attributes are stored in props here, because they are also used in ImageService
    public static $ValidationRules = [
        'image' => 'file|mimetypes:image/png,image/jpeg|max:1000',
        'altText' => 'max:255',
        'originator' => 'max:255',
        'link' => 'max:255',
        'keepShowingAfterSemester' => 'boolean',
        'license_id' => 'int|nullable',
    ];

    public static $ValidationAttributes = [
        'image' => 'Bild',
        'altText' => 'Alternativtext',
        'originator' => 'Urheber*in',
        'link' => 'Link zum Bild',
        'keepShowingAfterSemester' => 'Bild nach Ablauf des Semesters weiterhin anzeigen',
        'license_id' => 'Lizenz',
    ];
}
