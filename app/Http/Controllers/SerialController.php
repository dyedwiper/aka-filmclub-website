<?php

namespace App\Http\Controllers;

use App\Http\Requests\SerialFormRequest;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use App\Services\ImageService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

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
        return Serial::where('uuid', $uuid)->with('image.license', 'screenings')->first();
    }

    public function GetSerialsBySearchString(string $search)
    {
        return Serial::where('title', 'like', '%' . $search . '%')
            ->orWhere('subtitle', 'like', '%' . $search . '%')
            ->orWhere('article', 'like', '%' . $search . '%')
            ->orWhere('author', 'like', '%' . $search . '%')
            ->get();
    }

    public function PostSerial(SerialFormRequest $request)
    {
        $serial = new Serial(['uuid' => uniqid()]);

        $serial = $this->mapRequestToSerial($request, $serial);

        if ($request->image) {
            $serial->image_id = $this->imageService->storeSerialImage($request, $serial)->id;
        }

        $serial->save();
        return $serial;
    }

    public function PatchSerial(SerialFormRequest $request)
    {
        $serial = Serial::where('uuid', $request->uuid)->first();

        $serial = $this->mapRequestToSerial($request, $serial);

        $serial->save();
        return $serial;
    }

    public function DeleteSerial(Request $request)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $serial = Serial::firstWhere('uuid', $request->uuid);
        $image = $serial->image;

        $serial->delete();
        if ($image) {
            Storage::delete($image->path);
            $image->delete();
        }
    }

    // This function is only used during migration from the old website. It can be deleted afterwards.
    public function UpdateUuids()
    {
        $serials = Serial::all();
        foreach ($serials as $serial) {
            if (!$serial->uuid) {
                $serial->uuid = uniqid();
                $serial->save();
            }
        }
    }

    // This function is only used during migration from the old website. It can be deleted afterwards.
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

    private function mapRequestToSerial(Request $request, Serial $serial)
    {
        $serial->updated_by = $request->updated_by;
        $serial->title = $request->title;
        $serial->subtitle = $request->subtitle;
        $serial->article = $request->article;
        $serial->author = $request->author;
        $serial->semester = $request->semester;

        return $serial;
    }
}
