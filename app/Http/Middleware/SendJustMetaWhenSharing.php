<?php

namespace App\Http\Middleware;

use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use App\Utils\PathUtils;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class SendJustMetaWhenSharing
{
    const PATH_SCREENING = 'screening';
    const PATH_SERIAL = 'serial';
    const PATH_NOTICE = 'notice';

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Use variables instead of constants here because constants can't be expanded easily in strings.
        $akaName = 'aka-Filmclub';
        $locale = 'de_DE';
        $imageUrl = '';

        $baseUrl = Config::get('app.url');
        $storageBaseUrl = $baseUrl . '/storage/';

        $userAgent = $request->header('user-agent');
        $path = $request->path;
        // Log::channel('personal')->debug($userAgent);
        // Log::channel('personal')->debug(PathUtils::getLastSegment($path));

        if (str_contains($userAgent, 'facebookexternalhit') || str_contains($userAgent, 'TelegramBot')) {
            if (str_starts_with($path, self::PATH_SCREENING)) {
                $uuid = PathUtils::getLastSegment($path);
                $screening = Screening::where('uuid', $uuid)->with('image')->first();
                if (!$screening) {
                    abort(404);
                }
                if ($screening->image) {
                    $imageUrl = $storageBaseUrl . $screening->image->path;
                }
                $strippedSynopsis = strip_tags($screening->synopsis);
                return response("
                    <meta property=\"og:title\" content=\"$screening->title | $akaName\">
                    <meta property=\"og:image\" content=\"$imageUrl\">
                    <meta property=\"og:type\" content=\"website\" />
                    <meta property=\"og:url\" content=\"$baseUrl/$path\" />
                    <meta property=\"og:site_name\" content=\"$akaName\" />
                    <meta property=\"og:description\" content=\"$strippedSynopsis\" />
                    <meta property=\"og:locale\" content=\"$locale\" />
                ");
            } else if (str_starts_with($path, self::PATH_SERIAL)) {
                $uuid = PathUtils::getLastSegment($path);
                $serial = Serial::where('uuid', $uuid)->with('image')->first();
                if (!$serial) {
                    abort(404);
                }
                if ($serial->image) {
                    $imageUrl = $storageBaseUrl . $serial->image->path;
                }
                $strippedArticle = strip_tags($serial->article);
                return response("
                    <meta property=\"og:title\" content=\"$serial->title | $akaName\">
                    <meta property=\"og:image\" content=\"$imageUrl\">
                    <meta property=\"og:type\" content=\"website\" />
                    <meta property=\"og:url\" content=\"$baseUrl/$path\" />
                    <meta property=\"og:site_name\" content=\"$akaName\" />
                    <meta property=\"og:description\" content=\"$strippedArticle\" />
                    <meta property=\"og:locale\" content=\"$locale\" />
                ");
            } else if (str_starts_with($path, self::PATH_NOTICE)) {
                $uuid = PathUtils::getLastSegment($path);
                $notice = Notice::where('uuid', $uuid)->with('image')->first();
                if (!$notice) {
                    abort(404);
                }
                if ($notice->image) {
                    $imageUrl = $storageBaseUrl . $notice->image->path;
                }
                $strippedContent = strip_tags($notice->content);
                return response("
                    <meta property=\"og:title\" content=\"$notice->title | $akaName\">
                    <meta property=\"og:image\" content=\"$imageUrl\">
                    <meta property=\"og:type\" content=\"website\" />
                    <meta property=\"og:url\" content=\"$baseUrl/$path\" />
                    <meta property=\"og:site_name\" content=\"$akaName\" />
                    <meta property=\"og:description\" content=\"$strippedContent\" />
                    <meta property=\"og:locale\" content=\"$locale\" />
                ");
            }
        }

        return $next($request);
    }
}
