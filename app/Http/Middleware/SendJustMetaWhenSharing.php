<?php

namespace App\Http\Middleware;

use App\Utils\PathUtils;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SendJustMetaWhenSharing
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userAgent = $request->header('user-agent');
        $path = $request->path;
        Log::channel('personal')->debug($path);
        Log::channel('personal')->debug(PathUtils::getLastSegment($path));

        if (str_contains($userAgent, 'facebookexternalhit') || str_contains($userAgent, 'TelegramBot')) {
            if (str_starts_with($path, 'screening')) {
                $uuid = PathUtils::getLastSegment($path);
            }
        }

        return $next($request);
    }
}
