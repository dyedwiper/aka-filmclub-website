<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\ScreeningFormRequest;
use App\Models\Screening;
use App\Services\ImageService;
use Illuminate\Http\Request;

class ScreeningController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetFutureScreenings()
    {
        return Screening::where('date', '>', date("Y-m-d H:i:s"))->with('image')->get();
    }

    public function GetScreeningByUuid(string $uuid)
    {
        return Screening::where('uuid', $uuid)->with('image')->with('serial')->first();
    }

    public function GetScreeningsByYear(int $year)
    {
        return Screening::whereYear('date', $year)->get();
    }

    public function GetScreeningsBySemester(string $semester)
    {
        if (!preg_match('/^[WS]S\d{4}$/', $semester)) {
            return response('Not a valid semester identifier', 400);
        }

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

    public function UpdateUuids()
    {
        $screenings = Screening::all();
        foreach ($screenings as $screening) {
            $screening->uuid = uniqid();
            $screening->save();
        }
    }

    public function PostScreening(ScreeningFormRequest $request)
    {
        $screening = new Screening([
            'uuid' => uniqid(),
            'title' => $request->title,
            'original_title' => $request->originalTitle,
            'date' => $request->day . ' ' . $request->time,
            'synopsis' => $request->synopsis,
            'directed_by' => $request->directedBy,
            'written_by' => $request->writtenBy,
            'music_by' => $request->musicBy,
            'shot_by' => $request->shotBy,
            'cast' => $request->cast,
            'country' => $request->country,
            'year' => $request->year,
            'length' => $request->length,
            'medium' => $request->medium,
            'version' => $request->version,
            'venue' => $request->venue,
            'special' => $request->special,
            'tercet' => $request->tercet,
            'serial_id' => $request->serialId,
            'author' => $request->author,
        ]);

        if ($request->image) {
            $screening->image_id = $this->imageService->storeScreeningImage($request, $screening);
        }

        $screening->save();
        return $screening;
    }
}
