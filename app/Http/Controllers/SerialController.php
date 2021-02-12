<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Helpers\Helper;
use App\Services\ImageService;
use Illuminate\Support\Facades\Validator;

class SerialController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetSerialsBySemester(string $semester)
    {
        if (!preg_match('/^[WS]S\d{4}$/', $semester)) {
            return response('Not a valid semester identifier', 400);
        }

        $serials = Serial::where('semester', $semester)->with('image')->get();
        foreach ($serials as $serial) {
            $firstScreening = Screening::where('serial_id', $serial->id)->orderBy('date')->first();
            $serial->firstDate = strtotime($firstScreening->date);
        }
        return $serials->sortBy('firstDate')->values()->all();
    }

    public function GetSerialByUuid(string $uuid)
    {
        $serial = Serial::where('uuid', $uuid)->with('image', 'screenings')->first();
        return $serial;
    }

    public function UpdateUuids()
    {
        $serials = Serial::all();
        foreach ($serials as $serial) {
            $serial->uuid = uniqid();
            $serial->save();
        }
    }

    public function UpdateSemesters()
    {
        $serials = Serial::all();
        foreach ($serials as $serial) {
            $firstScreening = Screening::where('serial_id', $serial->id)->first();
            if ($firstScreening == null) continue;
            $firstDate = strtotime($firstScreening->date);
            $season = '';
            $year = 0;
            if (date('m', $firstDate) >= 4 && date('m', $firstDate) < 10) {
                $season = 'SS';
            } else {
                $season = 'WS';
            }
            if (date('m', $firstDate) >= 4) {
                $year = date('Y', $firstDate);
            } else {
                $year = date('Y', $firstDate) - 1;
            }
            $serial->semester = $season . $year;
            $serial->save();
        }
    }

    public function PostSerial(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required|max:255',
                'subtitle' => 'max:255',
                'article' => 'required',
                'author' => 'required|max:255',
            ],
            // Der leere Array muss hier stehen, weil die Parameter positioniert sind
            [],
            [
                'title' => 'Titel',
                'subtitle' => 'Untertitel',
                'article' => 'Reihenartikel',
                'author' => 'Autor*in',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['validationErrors' => $validator->errors()], 400);
        }

        $serial = new Serial([
            'uuid' => uniqid(),
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'article' => $request->article,
            'author' => $request->author,
        ]);

        if ($request->image) {
            $imageId = $this->imageService->storeSerialImage($request, $serial);
            $serial->image_id = $imageId;
        }
        $serial->save();
        return $serial->image_id;
    }
}
