<?php

namespace App\Utils;

class PathUtils
{
    public static function getLastSegment($path)
    {
        return substr($path, strrpos($path, '/') + 1);
    }
}
