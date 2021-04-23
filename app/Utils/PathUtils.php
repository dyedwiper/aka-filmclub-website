<?php

namespace App\Utils;

use Illuminate\Support\Facades\Log;

class PathUtils
{
    const uuidLength = 12;

    public static function getLastSegment($path)
    {
        Log::channel('personal')->debug(strrpos($path, '/'));
        return substr($path, -strrpos($path, '/'));
    }

    public static function getUuid($path)
    {
        Log::channel('personal')->debug(strrpos($path, '/'));
        return substr($path, -uuidLength);
    }
}
