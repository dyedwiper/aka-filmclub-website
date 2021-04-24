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
    const ROUTE_HOME = '';
    const ROUTE_NEWS = 'news';
    const ROUTE_PROGRAM = 'program';
    const ROUTE_PROGRAM_OVERVIEW = 'program/overview';
    const ROUTE_SERIALS = 'program/serials';
    const ROUTE_ARCHIVE = 'program/archive';
    const ROUTE_SCREENING = 'screening';
    const ROUTE_SERIAL = 'serial';
    const ROUTE_NOTICE = 'notice';
    const ROUTE_ABOUT = 'about';
    const ROUTE_FAQS = 'faqs';
    const ROUTE_PRESS = 'press';
    const ROUTE_AWARDS = 'awards';
    const ROUTE_SELFMADE_FILMS = 'selfmade';
    const ROUTE_CONTACT = 'contact';
    const ROUTE_LINKS = 'links';

    const PAGE_TITLE_HOME = '';
    const PAGE_TITLE_NEWS = 'News';
    const PAGE_TITLE_PROGRAM = 'Programm';
    const PAGE_TITLE_PROGRAM_OVERVIEW = 'Programmübersicht';
    const PAGE_TITLE_SERIALS = 'Filmreihen';
    const PAGE_TITLE_ARCHIVE = 'Archiv';
    const PAGE_TITLE_ABOUT = 'Über uns';
    const PAGE_TITLE_FAQS = 'FAQs';
    const PAGE_TITLE_PRESS = 'Pressespiegel';
    const PAGE_TITLE_AWARDS = 'Auszeichnungen';
    const PAGE_TITLE_SELFMADE_FILMS = 'Eigenproduktionen';
    const PAGE_TITLE_CONTACT = 'Kontakt';
    const PAGE_TITLE_LINKS = 'Links';

    const DESCRIPTION_HOME = 'aka-Filmclub';
    const DESCRIPTION_NEWS = 'Die neuesten News';
    const DESCRIPTION_PROGRAM = 'Aktuelles Programm';
    const DESCRIPTION_PROGRAM_OVERVIEW = 'Programmübersicht';
    const DESCRIPTION_SERIALS = 'Filmreihen';
    const DESCRIPTION_ARCHIVE = 'Archiv';
    const DESCRIPTION_ABOUT = 'Über uns';
    const DESCRIPTION_FAQS = 'FAQs';
    const DESCRIPTION_PRESS = 'Pressespiegel';
    const DESCRIPTION_AWARDS = 'Auszeichnungen';
    const DESCRIPTION_SELFMADE_FILMS = 'Eigenproduktionen';
    const DESCRIPTION_CONTACT = 'Kontakt';
    const DESCRIPTION_LINKS = 'Linksammlung';

    const STORAGE_PATH = '/storage/';

    const AKA_LOGO_PATH = '/images/aka_logo_yellow_big.png';

    const AKA_NAME = 'aka-Filmclub';

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
        $standardImageUrl = Config::get('app.url') . self::AKA_LOGO_PATH;
        // Log::channel('personal')->debug($userAgent);
        // Log::channel('personal')->debug(PathUtils::getLastSegment($path));

        if (str_contains($userAgent, 'facebookexternalhit') || str_contains($userAgent, 'TelegramBot')) {
            if ($path == self::ROUTE_HOME) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_HOME, $standardImageUrl, self::DESCRIPTION_HOME, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_NEWS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_NEWS, $standardImageUrl, self::DESCRIPTION_NEWS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_PROGRAM) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_PROGRAM, $standardImageUrl, self::DESCRIPTION_PROGRAM, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_PROGRAM_OVERVIEW) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_PROGRAM_OVERVIEW, $standardImageUrl, self::DESCRIPTION_PROGRAM_OVERVIEW, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_SERIALS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_SERIALS, $standardImageUrl, self::DESCRIPTION_SERIALS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_ARCHIVE) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_ARCHIVE, $standardImageUrl, self::DESCRIPTION_ARCHIVE, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_ABOUT) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_ABOUT, $standardImageUrl, self::DESCRIPTION_ABOUT, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_FAQS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_FAQS, $standardImageUrl, self::DESCRIPTION_FAQS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_PRESS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_PRESS, $standardImageUrl, self::DESCRIPTION_PRESS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_AWARDS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_AWARDS, $standardImageUrl, self::DESCRIPTION_AWARDS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_SELFMADE_FILMS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_SELFMADE_FILMS, $standardImageUrl, self::DESCRIPTION_SELFMADE_FILMS, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_CONTACT) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_CONTACT, $standardImageUrl, self::DESCRIPTION_CONTACT, $path);
                return response($ogMeta);
            } elseif ($path == self::ROUTE_LINKS) {
                $ogMeta = $this->createOgMeta(self::PAGE_TITLE_LINKS, $standardImageUrl, self::DESCRIPTION_LINKS, $path);
                return response($ogMeta);
            } elseif (str_starts_with($path, self::ROUTE_SCREENING)) {
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
            if ($path == self::ROUTE_HOME) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_HOME, $standardImageUrl, self::DESCRIPTION_HOME);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_NEWS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_NEWS, $standardImageUrl, self::DESCRIPTION_NEWS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_PROGRAM) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_PROGRAM, $standardImageUrl, self::DESCRIPTION_PROGRAM);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_PROGRAM_OVERVIEW) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_PROGRAM_OVERVIEW, $standardImageUrl, self::DESCRIPTION_PROGRAM_OVERVIEW);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_SERIALS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_SERIALS, $standardImageUrl, self::DESCRIPTION_SERIALS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_ARCHIVE) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_ARCHIVE, $standardImageUrl, self::DESCRIPTION_ARCHIVE);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_ABOUT) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_ABOUT, $standardImageUrl, self::DESCRIPTION_ABOUT);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_FAQS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_FAQS, $standardImageUrl, self::DESCRIPTION_FAQS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_PRESS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_PRESS, $standardImageUrl, self::DESCRIPTION_PRESS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_AWARDS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_AWARDS, $standardImageUrl, self::DESCRIPTION_AWARDS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_SELFMADE_FILMS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_SELFMADE_FILMS, $standardImageUrl, self::DESCRIPTION_SELFMADE_FILMS);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_CONTACT) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_CONTACT, $standardImageUrl, self::DESCRIPTION_CONTACT);
                return response($twitterMeta);
            } elseif ($path == self::ROUTE_LINKS) {
                $twitterMeta = $this->createTwitterMeta(self::PAGE_TITLE_LINKS, $standardImageUrl, self::DESCRIPTION_LINKS);
                return response($twitterMeta);
            } elseif (str_starts_with($path, self::ROUTE_SCREENING)) {
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
        $akaName = self::AKA_NAME;
        $locale = 'de_DE';

        $ogTitle = $title ? $title . ' | ' . $akaName : $akaName;

        return "
            <meta property=\"og:title\" content=\"$ogTitle\">
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
        $twitterTitle = $title ? $title . ' | ' . self::AKA_NAME : self::AKA_NAME;

        return "
            <meta name=\"twitter:card\" content=\"summary_large_image\" />
            <meta name=\"twitter:title\" content=\"$twitterTitle\">
            <meta name=\"twitter:image\" content=\"$imageUrl\">
            <meta name=\"twitter:description\" content=\"$description\" />
        ";
    }
}