<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScreeningFormRequest;
use App\Models\Screening;
use App\Services\ImageService;
use App\Services\ScreeningService;
use DateTime;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ScreeningController extends Controller
{
    private $screeningService;
    private $imageService;

    public function __construct(ScreeningService $screeningService, ImageService $imageService)
    {
        $this->screeningService = $screeningService;
        $this->imageService = $imageService;
    }

    public function GetScreenings()
    {
        return Screening::all();
    }

    public function GetFutureScreenings()
    {
        return Screening::where('date', '>', date("Y-m-d H:i:s"))
            ->whereNull('supportingFilmOf')
            ->orderBy('date')
            ->with('image')
            ->with('supportingFilms:supportingFilmOf,uuid,title')
            ->get();
    }

    public function GetScreeningByUuid(string $uuid)
    {
        return Screening::where('uuid', $uuid)
            ->with('image.license')->with('serial')->with('mainFilm')->with('supportingFilms')->first();
    }

    public function GetScreeningsBySemester(string $semester)
    {
        return $this->screeningService->getScreeningsForSemester($semester);
    }

    public function GetScreeningsBySearchString(string $search)
    {
        return Screening::where('title', 'like', '%' . $search . '%')
            ->orWhere('original_title', 'like', '%' . $search . '%')
            ->orWhere('synopsis', 'like', '%' . $search . '%')
            ->orWhere('directed_by', 'like', '%' . $search . '%')
            ->orWhere('written_by', 'like', '%' . $search . '%')
            ->orWhere('music_by', 'like', '%' . $search . '%')
            ->orWhere('shot_by', 'like', '%' . $search . '%')
            ->orWhere('cast', 'like', '%' . $search . '%')
            ->orWhere('special', 'like', '%' . $search . '%')
            ->orWhere('author', 'like', '%' . $search . '%')
            ->orderByDesc('date')
            ->with('supportingFilms:supportingFilmOf,title')
            ->get();
    }

    public function PostScreening(ScreeningFormRequest $request)
    {
        if ($request->supportingFilmOf) {
            $this->checkMainFilmDate($request);
        }

        $screening = new Screening(['uuid' => uniqid(),]);
        $screening = $this->mapRequestToScreening($request, $screening);

        if ($request->image) {
            $screening->image_id = $this->imageService->storeScreeningImage($request, $screening)->id;
        }

        $screening->save();
        return $screening;
    }

    public function PatchScreening(ScreeningFormRequest $request)
    {
        if ($request->supportingFilmOf) {
            $this->checkMainFilmDate($request);
        }

        $screening = Screening::where('uuid', $request->uuid)->first();
        $screening = $this->mapRequestToScreening($request, $screening);
        $screening->save();
        return $screening;
    }

    public function DeleteScreening(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(403);
        }

        $screening = Screening::firstWhere('uuid', $uuid);

        if ($screening->billing) {
            abort(422, 'Zu dieser Vorführung existiert noch eine Abrechnung, die vorher gelöscht werden muss.');
        }
        if (count($screening->supportingFilms) > 0) {
            abort(422, 'Diese Vorführung kann nicht gelöscht werden, weil ihr noch Vorfilme zugeordnet sind.');
        }

        $image = $screening->image;
        $screening->delete();
        if ($image) {
            Storage::delete($image->path);
            $image->delete();
        }
    }

    private function mapRequestToScreening(Request $request, Screening $screening)
    {
        $screening->updated_by = $request->updated_by;
        $screening->title = $request->title;
        $screening->original_title = $request->originalTitle;
        $screening->date = $request->day . ' ' . $request->time;
        $screening->synopsis = $request->synopsis;
        $screening->directed_by = $request->directedBy;
        $screening->written_by = $request->writtenBy;
        $screening->music_by = $request->musicBy;
        $screening->shot_by = $request->shotBy;
        $screening->cast = $request->cast;
        $screening->country = $request->country;
        $screening->year = $request->year;
        $screening->length = $request->length;
        $screening->medium = $request->medium;
        $screening->version = $request->version;
        $screening->venue = $request->venue;
        $screening->special = $request->special;
        $screening->tercet = $request->tercet;
        $screening->serial_id = $request->serialId;
        $screening->supportingFilmOf = $request->supportingFilmOf;
        $screening->author = $request->author;

        return $screening;
    }

    private function checkMainFilmDate(Request $request)
    {
        $mainFilm = Screening::where('id', $request->supportingFilmOf)->first();
        $mainDate = new DateTime($mainFilm->date);
        $validator = Validator::make($request->all(), [
            'day' => 'date_equals:' . $mainDate->format('Y-m-d')
        ]);
        if ($validator->fails()) {
            throw new HttpResponseException(
                response()->json(
                    ['validationErrors' => ['Ein Vorfilm muss das selbe Vorführdatum wie der Hauptfilm.']],
                    422
                )
            );
        }
    }
}
