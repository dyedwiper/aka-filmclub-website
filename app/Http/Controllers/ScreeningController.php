<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
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
        return Screening::where('date', '>', date("Y-m-d H:i:s"))->get();
    }

    public function GetScreeningByUuid(string $uuid)
    {
        return Screening::where('uuid', $uuid)->first();
    }

    public function GetScreeningsBySerialId(int $serialId)
    {
        return Screening::where('serial_id', $serialId)->get();
    }

    public function GetScreeningsByYear(int $year)
    {
        return Screening::whereYear('date', $year)->get();
    }

    public function GetScreeningsBySemester(string $season, int $year)
    {
        if ($season != 'ws' & $season != 'ss') {
            return response('Not a valid season identifier', 400);
        }

        if ($season == 'ws') {
            return Screening::whereYear('date', $year)
                ->whereMonth('date', '>=', 10)
                ->orWhereYear('date', $year + 1)
                ->whereMonth('date', '<', 4)
                ->orderBy('date')
                ->get();
        }

        if ($season == 'ss') {
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

    public function PostScreening(Request $request)
    {
        $screening = new Screening($request->all());
        $screening->uuid = uniqid();
        $imageId = $this->imageService->storeScreeningImage($request, $screening);
        $screening->image_id = $imageId;
        $screening->save();
        return $screening->id;
    }
}
