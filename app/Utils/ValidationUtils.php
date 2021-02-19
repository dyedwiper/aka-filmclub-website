<?php

namespace App\Utils;

use Illuminate\Http\Exceptions\HttpResponseException;

class ValidationUtils
{
    public static function handleValidationError($validator)
    {
        throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()->all()], 422));
    }
}
