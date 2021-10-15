<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScreeningFormRequest;
use App\Models\Screening;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class ScreeningController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetFutureScreenings()
    {
        return Screening::where('date', '>', date("Y-m-d H:i:s"))->orderBy('date')->with('image')->get();
    }

    public function GetScreeningByUuid(string $uuid)
    {
        return Screening::where('uuid', $uuid)->with('image.license')->with('serial')->first();
    }

    public function GetScreeningsByYear(int $year)
    {
        return Screening::whereYear('date', $year)->get();
    }

    public function GetScreeningsBySemester(string $semester)
    {
        $season = substr($semester, 0, 2);
        $year = intval(substr($semester, 2, 4));

        if ($season == 'WS') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderBy('date')
                ->get();
        }

        if ($season == 'SS') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 4)
                ->whereMonth('date', '<', 10)
                ->orderBy('date')
                ->get();
        }
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
            ->get();
    }

    public function PostScreening(ScreeningFormRequest $request)
    {
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
        $screening->author = $request->author;

        return $screening;
    }
}
