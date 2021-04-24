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
    const ROUTE_SCREENING = 'screening';
    const ROUTE_SERIAL = 'serial';
    const ROUTE_NOTICE = 'notice';

    const STORAGE_PATH = '/storage/';

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
        // Log::channel('personal')->debug($userAgent);
        // Log::channel('personal')->debug(PathUtils::getLastSegment($path));

        if (str_contains($userAgent, 'facebookexternalhit') || str_contains($userAgent, 'TelegramBot')) {
            if (str_starts_with($path, self::ROUTE_SCREENING)) {
                $screeningData = $this->getScreeningData($path);
                $ogMeta = $this->createOgMeta($screeningData['title'], $screeningData['imageUrl'], $screeningData['description'], $path);
                return response($ogMeta);
            } elseif (str_starts_with($path, self::ROUTE_SERIAL)) {
                $serialData = $this->getSerialData($path);
                $ogMeta = $this->createOgMeta($serialData['title'], $serialData['imageUrl'], $serialData['description'], $path);
                return response($ogMeta);
            } elseif (str_starts_with($path, self::ROUTE_NOTICE)) {
                $noticeData = $this->getNoticeData($path);
                $ogMeta = $this->createOgMeta($noticeData['title'], $noticeData['imageUrl'], $noticeData['description'], $path);
                return response($ogMeta);
            }
        } else if (str_contains($userAgent, 'Twitterbot')) {
            if (str_starts_with($path, self::ROUTE_SCREENING)) {
                $screeningData = $this->getScreeningData($path);
                $twitterMeta = $this->createTwitterMeta($screeningData['title'], $screeningData['imageUrl'], $screeningData['description']);
                return response($twitterMeta);
            } elseif (str_starts_with($path, self::ROUTE_SERIAL)) {
                $serialData = $this->getSerialData($path);
                $twitterMeta = $this->createTwitterMeta($serialData['title'], $serialData['imageUrl'], $serialData['description'], $path);
                return response($twitterMeta);
            } elseif (str_starts_with($path, self::ROUTE_NOTICE)) {
                $noticeData = $this->getNoticeData($path);
                $twitterMeta = $this->createTwitterMeta($noticeData['title'], $noticeData['imageUrl'], $noticeData['description'], $path);
                return response($twitterMeta);
            }
        }

        return $next($request);
    }

    private function getScreeningData($path)
    {
        $uuid = PathUtils::getLastSegment($path);
        $screening = Screening::where('uuid', $uuid)->with('image')->first();
        if (!$screening) {
            abort(404);
        }
        $screeningData['title'] = $screening->title;
        $screeningData['imageUrl'] = "";
        if ($screening->image) {
            $screeningData['imageUrl'] = Config::get('app.url') . self::STORAGE_PATH . $screening->image->path;
        }
        $screeningData['description'] = strip_tags($screening->synopsis);
        return $screeningData;
    }

    private function getSerialData($path)
    {
        $uuid = PathUtils::getLastSegment($path);
        $serial = Serial::where('uuid', $uuid)->with('image')->first();
        if (!$serial) {
            abort(404);
        }
        $serialData['title'] = $serial->title;
        $serialData['imageUrl'] = "";
        if ($serial->image) {
            $serialData['imageUrl'] = Config::get('app.url') . self::STORAGE_PATH . $serial->image->path;
        }
        $serialData['description'] = strip_tags($serial->article);
        return $serialData;
    }

    private function getNoticeData($path)
    {
        $uuid = PathUtils::getLastSegment($path);
        $notice = Notice::where('uuid', $uuid)->with('image')->first();
        if (!$notice) {
            abort(404);
        }
        $noticeData['title'] = $notice->title;
        $noticeData['imageUrl'] = "";
        if ($notice->image) {
            $noticeData['imageUrl'] = Config::get('app.url') . self::STORAGE_PATH . $notice->image->path;
        }
        $noticeData['description'] = strip_tags($notice->content);
        return $noticeData;
    }

    private function createOgMeta($title, $imageUrl, $description, $path)
    {
        $baseUrl = Config::get('app.url');
        $akaName = 'aka-Filmclub';
        $locale = 'de_DE';

        return "
            <meta property=\"og:title\" content=\"$title | $akaName\">
            <meta property=\"og:image\" content=\"$imageUrl\">
            <meta property=\"og:type\" content=\"website\" />
            <meta property=\"og:url\" content=\"$baseUrl/$path\" />
            <meta property=\"og:site_name\" content=\"$akaName\" />
            <meta property=\"og:description\" content=\"$description\" />
            <meta property=\"og:locale\" content=\"$locale\" />
        ";
    }

    private function createTwitterMeta($title, $imageUrl, $description)
    {
        return "
            <meta name=\"twitter:card\" content=\"summary_large_image\" />
            <meta name=\"twitter:title\" content=\"$title\">
            <meta name=\"twitter:image\" content=\"$imageUrl\">
            <meta name=\"twitter:description\" content=\"$description\" />
        ";
    }
}
