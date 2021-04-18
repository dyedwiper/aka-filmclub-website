<?php

namespace App\Http\Controllers;

use App\Http\Requests\SelfmadeFilmFormRequest;
use App\Models\SelfmadeFilm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class SelfmadeFilmController extends Controller
{
    public function GetSelfmadeFilms()
    {
        return SelfmadeFilm::orderBy('position')->get();
    }

    public function GetSelfmadeFilmByUuid(string $uuid)
    {
        return SelfmadeFilm::firstWhere('uuid', $uuid);
    }

    public function PostSelfmadeFilm(SelfmadeFilmFormRequest $request)
    {
        $selfmadeFilm = new SelfmadeFilm([
            'uuid' => uniqid(),
            'title' => $request->title,
            'synopsis' => $request->synopsis,
            'directed_by' => $request->directedBy,
            'written_by' => $request->writtenBy,
            'music_by' => $request->musicBy,
            'shot_by' => $request->shotBy,
            'cast' => $request->cast,
            'country' => $request->country,
            'year' => $request->year,
            'length' => $request->length,
            'source' => $request->source,
            'position' => SelfmadeFilm::all()->count(),
        ]);
        $selfmadeFilm->save();
        return $selfmadeFilm;
    }

    public function PatchSelfmadeFilm(SelfmadeFilmFormRequest $request)
    {
        $selfmadeFilm = SelfmadeFilm::firstWhere('uuid', $request->uuid);
        $selfmadeFilm->title = $request->title;
        $selfmadeFilm->synopsis = $request->synopsis;
        $selfmadeFilm->directed_by = $request->directedBy;
        $selfmadeFilm->written_by = $request->writtenBy;
        $selfmadeFilm->music_by = $request->musicBy;
        $selfmadeFilm->shot_by = $request->shotBy;
        $selfmadeFilm->cast = $request->cast;
        $selfmadeFilm->country = $request->country;
        $selfmadeFilm->year = $request->year;
        $selfmadeFilm->length = $request->length;
        $selfmadeFilm->source = $request->source;
        if ($selfmadeFilm->position > $request->position) {
            $afterPositionedFilms = SelfmadeFilm
                ::where('position', '>=', $request->position)
                ->where('position', '<', $selfmadeFilm->position)
                ->get();
            foreach ($afterPositionedFilms as $afterFilm) {
                $afterFilm->position = $afterFilm->position + 1;
                $afterFilm->save();
            }
        } elseif ($selfmadeFilm->position < $request->position) {
            $beforePositionedFilms = SelfmadeFilm
                ::where('position', '<=', $request->position)
                ->where('position', '>', $selfmadeFilm->position)
                ->get();
            foreach ($beforePositionedFilms as $beforeFilm) {
                $beforeFilm->position = $beforeFilm->position - 1;
                $beforeFilm->save();
            }
        }
        $selfmadeFilm->position = $request->position;
        $selfmadeFilm->save();
    }

    public function DeleteSelfmadeFilm(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $selfmadeFilm = SelfmadeFilm::firstWhere('uuid', $uuid);
        $afterPositionedFilms = SelfmadeFilm::where('position', '>', $selfmadeFilm->position)->get();
        foreach ($afterPositionedFilms as $afterFilm) {
            $afterFilm->position = $afterFilm->position - 1;
            $afterFilm->save();
        }
        $selfmadeFilm->delete();
    }
}
