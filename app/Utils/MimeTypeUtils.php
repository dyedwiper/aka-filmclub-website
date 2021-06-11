<?php

namespace App\Utils;

class MimeTypeUtils
{
    public static function convertMime2Ext($mimetype)
    {
        $extensions = [
            'image/jpeg' => 'jpeg',
            'image/png' => 'png'
        ];

        return $extensions[$mimetype];
    }
}
