<?php

namespace App\Helpers;

class Helper
{
    public static function mime2ext($mimetype)
    {
        $extensions = [
            'image/jpeg' => 'jpeg',
            'image/png' => 'png'
        ];

        return $extensions[$mimetype];
    }
}
