<?php

namespace App\Http\Controllers;

use App\Http\Requests\SelfmadeFilmFormRequest;
use App\Models\SelfmadeFilm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class SelfmadeFilmController extends Controller
{
    public function GetSelfmadeFilms()
    {
        $selfmadeFilms = SelfmadeFilm::orderBy('position')->get();
        $this->setVimeoProps($selfmadeFilms);

        return $selfmadeFilms;
    }

    public function GetSelfmadeFilmByUuid(string $uuid)
    {
        $selfmadeFilm = SelfmadeFilm::firstWhere('uuid', $uuid);

        return $selfmadeFilm;
    }

    public function PostSelfmadeFilm(SelfmadeFilmFormRequest $request)
    {
        $selfmadeFilm = new SelfmadeFilm([
            'uuid' => uniqid(),
            'position' => SelfmadeFilm::all()->count(),
        ]);
        $selfmadeFilm = $this->mapRequestToSelfmadeFilm($request, $selfmadeFilm);

        $selfmadeFilm->save();

        return $selfmadeFilm;
    }

    public function PatchSelfmadeFilm(SelfmadeFilmFormRequest $request)
    {
        $selfmadeFilm = SelfmadeFilm::firstWhere('uuid', $request->uuid);
        $selfmadeFilm = $this->mapRequestToSelfmadeFilm($request, $selfmadeFilm);

        $this->updateOtherPositionsOnPatch($request, $selfmadeFilm);
        $selfmadeFilm->position = $request->position;

        $selfmadeFilm->save();

        return $selfmadeFilm;
    }

    public function DeleteSelfmadeFilm(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(403);
        }

        $selfmadeFilm = SelfmadeFilm::firstWhere('uuid', $uuid);

        $this->updateOtherPositionsOnDelete($selfmadeFilm);

        $selfmadeFilm->delete();
    }

    private function setVimeoProps($selfmadeFilms)
    {
        foreach ($selfmadeFilms as $selfmadeFilm) {
            if(!$selfmadeFilm->vimeo_id) {
                continue;
            }

            $areVimeoVideosEmbedded = env('ARE_VIMEO_VIDEOS_EMBEDDED');

            $selfmadeFilm->areVimeoVideosEmbedded = $areVimeoVideosEmbedded;

            if($areVimeoVideosEmbedded){
                $selfmadeFilm->vimeoLink = env('VIMEO_EMBED_URL') . $selfmadeFilm->vimeo_id;
            } else {
                $selfmadeFilm->vimeoLink = env('VIMEO_LINK_URL') . $selfmadeFilm->vimeo_id;
            }
        }
    }

    private function mapRequestToSelfmadeFilm(Request $request, SelfmadeFilm $selfmadeFilm)
    {
        $selfmadeFilm->updated_by = $request->updated_by;
        $selfmadeFilm->title = $request->title;
        $selfmadeFilm->synopsis = $request->synopsis;
        $selfmadeFilm->directed_by = $request->directedBy;
        $selfmadeFilm->written_by = $request->writtenBy;
        $selfmadeFilm->music_by = $request->musicBy;
        $selfmadeFilm->shot_by = $request->shotBy;
        $selfmadeFilm->edited_by = $request->editedBy;
        $selfmadeFilm->cast = $request->cast;
        $selfmadeFilm->country = $request->country;
        $selfmadeFilm->year = $request->year;
        $selfmadeFilm->length = $request->length;
        $selfmadeFilm->vimeo_id = $request->vimeo_id;

        return $selfmadeFilm;
    }

    private function updateOtherPositionsOnPatch(Request $request, SelfmadeFilm $selfmadeFilm) 
    {
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
    }

    private function updateOtherPositionsOnDelete(SelfmadeFilm $selfmadeFilm) 
    {
        $afterPositionedFilms = SelfmadeFilm::where('position', '>', $selfmadeFilm->position)->get();
        foreach ($afterPositionedFilms as $afterFilm) {
            $afterFilm->position = $afterFilm->position - 1;
            $afterFilm->save();
        }
    }
}
