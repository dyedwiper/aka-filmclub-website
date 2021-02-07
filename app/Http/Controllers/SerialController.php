<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SerialController extends Controller
{
    public function GetSerialsBySemester(string $season, int $year)
    {
        if ($season != 'ws' & $season != 'ss') {
            return response('Not a valid season identifier', 400);
        }

        $allSerials = Serial::orderByDesc('id')->get();
        $serialsFromSemester = [];
        foreach ($allSerials as $serial) {
            $firstScreening = Screening::where('serial_id', $serial->id)->orderBy('date')->first();
            if ($firstScreening == null) continue;
            $firstDate = strtotime($firstScreening->date);
            if (
                $season == 'ws'
                && (date('Y', $firstDate) == $year && date('m', $firstDate) >= 10
                    || date('Y', $firstDate) == $year + 1 && date('m', $firstDate) < 4)
            ) {
                array_push($serialsFromSemester, $serial);
            } elseif (
                $season == 'ss'
                && (date('Y', $firstDate) == $year && date('m', $firstDate) >= 4 && date('m', $firstDate) < 10)
            ) {
                array_push($serialsFromSemester, $serial);
            }
        }
        return $serialsFromSemester;
    }

    public function GetSerialByUuid(string $uuid)
    {
        return Serial::where('uuid', $uuid)->first();
    }

    public function UpdateUuids()
    {
        $serials = Serial::all();
        foreach ($serials as $serial) {
            $serial->uuid = uniqid();
            $serial->save();
        }
    }

    public function PostSerial(Request $request)
    {
        $serial = new Serial([
            'uuid' => uniqid(),
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'article' => $request->article,
            'author' => $request->author,
        ]);

        $imageName = $serial->uuid . '_' . $serial->title . '.' . $request->image->getClientOriginalExtension();
        $imagePath = $request->image->storeAs('images/serials', $imageName, 'public');
        $image = new Image([
            'uuid' => uniqid(),
            'source' => $imagePath,
            'title' => $request->imageTitle,
            'alt_text' => $request->altText,
            'copyright' => $request->copyright,
        ]);
        $image->save();
        $serial->image_id = $image->id;
        $serial->save();
        return $serial->image_id;
    }
}
