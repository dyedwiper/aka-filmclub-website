<?php

namespace App\Http\Controllers;

use App\Http\Requests\SelfmadeFilmFormRequest;
use App\Models\SelfmadeFilm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class SelfmadeFilmController extends Controller
{
    public function GetVideos()
    {
        return SelfmadeFilm::orderBy('position')->get();
    }

    public function GetVideoByUuid(string $uuid)
    {
        return SelfmadeFilm::firstWhere('uuid', $uuid);
    }

    public function PostVideo(SelfmadeFilmFormRequest $request)
    {
        $video = new SelfmadeFilm([
            'uuid' => uniqid(),
            'title' => $request->title,
            'description' => $request->description,
            'source' => $request->source,
            'position' => SelfmadeFilm::all()->count(),
        ]);
        $video->save();
        return $video;
    }

    public function PatchVideo(SelfmadeFilmFormRequest $request)
    {
        $video = SelfmadeFilm::firstWhere('uuid', $request->uuid);
        $video->title = $request->title;
        $video->description = $request->description;
        $video->source = $request->source;
        if ($video->position > $request->position) {
            $afterPositionedVideos = SelfmadeFilm
                ::where('position', '>=', $request->position)
                ->where('position', '<', $video->position)
                ->get();
            foreach ($afterPositionedVideos as $afterVideo) {
                $afterVideo->position = $afterVideo->position + 1;
                $afterVideo->save();
            }
        } elseif ($video->position < $request->position) {
            $beforePositionedVideos = SelfmadeFilm
                ::where('position', '<=', $request->position)
                ->where('position', '>', $video->position)
                ->get();
            foreach ($beforePositionedVideos as $beforeVideo) {
                $beforeVideo->position = $beforeVideo->position - 1;
                $beforeVideo->save();
            }
        }
        $video->position = $request->position;
        $video->save();
    }

    public function DeleteVideo(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $video = SelfmadeFilm::firstWhere('uuid', $uuid);
        $afterPositionedVideos = SelfmadeFilm::where('position', '>', $video->position)->get();
        foreach ($afterPositionedVideos as $afterVideo) {
            $afterVideo->position = $afterVideo->position - 1;
            $afterVideo->save();
        }
        $video->delete();
    }
}
