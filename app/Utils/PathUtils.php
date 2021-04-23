<?php

namespace App\Utils;

use Illuminate\Support\Facades\Log;

class PathUtils
{
    public static function getLastSegment($path)
    {
        return substr($path, strrpos($path, '/') + 1);
    }
}
