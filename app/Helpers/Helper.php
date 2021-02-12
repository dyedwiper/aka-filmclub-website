<?php

namespace App\Helpers;

class Helper
{
    public static function convertMime2Ext($mimetype)
    {
        $extensions = [
            'image/jpeg' => 'jpeg',
            'image/png' => 'png'
        ];

        return $extensions[$mimetype];
    }

    public static function prepareTitle(string $string)
    {
        $string1 = substr($string, 0, 15);
        $string2 = str_replace(['ä', 'ö', 'ü', 'ß',], ['ae', 'oe', 'ue', 'ss'], $string1);
        $string3 =  preg_replace('/[^a-z^A-Z^0-9]+/', '_', $string2);
        return strtolower($string3);
    }
}
