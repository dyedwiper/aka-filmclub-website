<?php

namespace App\Http\Controllers;

use App\Http\Requests\SerialFormRequest;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use App\Services\ImageService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SerialController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetSerials()
    {
        return Serial::orderByDesc('id')->get();
    }

    public function GetSerialsBySemester(string $semester)
    {
        if (!preg_match('/^[WS]S\d{4}$/', $semester)) {
            return response('Not a valid semester identifier', 400);
        }

        $serials = Serial::where('semester', $semester)->with('image')->get();
        foreach ($serials as $serial) {
            $firstScreening = Screening::where('serial_id', $serial->id)->orderBy('date')->first();
            if ($firstScreening) {
                $serial->firstDate = strtotime($firstScreening->date);
            }
        }
        return $serials->sortBy('firstDate')->values()->all();
    }


    public function GetSerialByUuid(string $uuid)
    {
        return Serial::where('uuid', $uuid)->with('image', 'screenings')->first();
    }

    public function PostSerial(SerialFormRequest $request)
    {
        $serial = new Serial([
            'uuid' => uniqid(),
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'article' => $request->article,
            'author' => $request->author,
            'semester' => $request->semester,
        ]);

        if ($request->image) {
            $serial->image_id = $this->imageService->storeSerialImage($request, $serial);
        }

        $serial->save();
        return $serial;
    }

    public function PatchSerial(SerialFormRequest $request)
    {
        $serial = Serial::where('uuid', $request->uuid)->first();

        $serial->title = $request->title;
        $serial->subtitle = $request->subtitle;
        $serial->article = $request->article;
        $serial->semester = $request->semester;
        $serial->author = $request->author;

        $serial->save();
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
}
