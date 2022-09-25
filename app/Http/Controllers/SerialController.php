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

    public function GetCurrentAndFutureSerials()
    {
        $currentYear = date('Y');
        $currentMonth = date('m');
        if ($currentMonth <= 3) {
            return Serial::where('semester', 'like', 'WS' . ($currentYear - 1))
                ->orWhere('semester', 'like', 'SS' . $currentYear)->orderByDesc('id')->get();
        } else if ($currentMonth > 3 && $currentMonth < 10) {
            return Serial::where('semester', 'like', '%' . $currentYear)->orderByDesc('id')->get();
        } else {
            return Serial::where('semester', 'like', 'WS' . $currentYear)
                ->orWhere('semester', 'like', 'SS' . ($currentYear + 1))->orderByDesc('id')->get();
        }
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
        return Serial::where('uuid', $uuid)
            ->with('image.license', 'screenings.supportingFilms:supportingFilmOf')
            ->first();
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
            abort(403);
        }
        $serial = Serial::where('uuid', $request->uuid)->with('screenings')->first();
        if (count($serial->screenings) > 0) {
            abort(422, 'Die Reihe kann nicht gelöscht werden, solange ihr noch Vorführungen zugeordnet sind.');
        }
        $image = $serial->image;

        $serial->delete();
        if ($image) {
            Storage::delete($image->path);
            $image->delete();
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
