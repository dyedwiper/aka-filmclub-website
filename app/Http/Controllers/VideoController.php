<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoFormRequest;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class VideoController extends Controller
{
    public function GetVideos()
    {
        return Video::orderBy('position')->get();
    }

    public function GetVideoByUuid(string $uuid)
    {
        return Video::firstWhere('uuid', $uuid);
    }

    public function PostVideo(VideoFormRequest $request)
    {
        $video = new Video([
            'uuid' => uniqid(),
            'title' => $request->title,
            'description' => $request->description,
            'source' => $request->source,
            'position' => Video::all()->count(),
        ]);
        $video->save();
        return $video;
    }

    public function PatchVideo(VideoFormRequest $request)
    {
        $video = Video::firstWhere('uuid', $request->uuid);
        $video->title = $request->title;
        $video->description = $request->description;
        $video->source = $request->source;
        if ($video->position > $request->position) {
            $afterPositionedVideos = Video
                ::where('position', '>=', $request->position)
                ->where('position', '<', $video->position)
                ->get();
            foreach ($afterPositionedVideos as $afterVideo) {
                $afterVideo->position = $afterVideo->position + 1;
                $afterVideo->save();
            }
        } elseif ($video->position < $request->position) {
            $beforePositionedVideos = Video
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
        $video = Video::firstWhere('uuid', $uuid);
        $afterPositionedVideos = Video::where('position', '>', $video->position)->get();
        foreach ($afterPositionedVideos as $afterVideo) {
            $afterVideo->position = $afterVideo->position - 1;
            $afterVideo->save();
        }
        $video->delete();
    }
}
