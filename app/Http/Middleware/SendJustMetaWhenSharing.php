<?php

namespace App\Http\Middleware;

use App\Models\Screening;
use App\Utils\PathUtils;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
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
        $baseUrl = Config::get('app.url');
        $storageBaseUrl = $baseUrl . '/storage/';
        $akaName = 'aka-Filmclub';
        $locale = 'de_DE';

        $userAgent = $request->header('user-agent');
        $path = $request->path;
        // Log::channel('personal')->debug($userAgent);
        // Log::channel('personal')->debug(PathUtils::getLastSegment($path));

        if (str_contains($userAgent, 'facebookexternalhit') || str_contains($userAgent, 'TelegramBot')) {
            if (str_starts_with($path, 'screening')) {
                $uuid = PathUtils::getLastSegment($path);
                $screening = Screening::where('uuid', $uuid)->with('image')->first();
                if (!$screening) {
                    abort(404, 'Vorführung nicht gefunden.');
                }
                $imageUrl = $storageBaseUrl . $screening->image->path;
                return response("
                    <meta property=\"og:title\" content=\"$screening->title | $akaName\">
                    <meta property=\"og:image\" content=\"$imageUrl\">
                    <meta property=\"og:type\" content=\"website\" />
                    <meta property=\"og:url\" content=\"$baseUrl/$path\" />
                    <meta property=\"og:site_name\" content=\"$akaName\" />
                    <meta property=\"og:description\" content=\"$screening->synopsis\" />
                    <meta property=\"og:locale\" content=\"$locale\" />
                ");
            }
        }

        return $next($request);
    }
}
