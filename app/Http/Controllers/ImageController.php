<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\ImageFormRequest;
use App\Models\Image;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function GetImageById(int $id)
    {
        return Image::where('id', $id)->first();
    }

    public function GetImageByUuid(string $uuid)
    {
        return Image::where('uuid', $uuid)->first();
    }

    public function PostImage(ImageFormRequest $request)
    {
        // Der Check, ob ein Bild mitgeschickt wurde, findet hier statt und nicht im ImageFormRequest,
        // weil der Patch auch ohne Bild möglich ist
        $validator = Validator::make(
            $request->all(),
            ['image' => 'required'],
            [],
            ['image' => 'Bild']
        );
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()], 422));
        }

        switch ($request->assocType) {
            case 'serial':
                $assocEntity = Serial::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/serials';
                break;
            case 'screening':
                $assocEntity = Screening::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/screenings';
                break;
            case 'notice':
                $assocEntity = Notice::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/notices';
                break;
        }
        $imageName = $request->assocUuid . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs($imageFolder, $imageName, 'public');

        $image = new Image([
            'uuid' => uniqid(),
            'path' => $imagePath,
            'alt_text' => $request->altText,
            'copyright' => $request->copyright,
        ]);
        $image->save();
        $assocEntity->image_id = $image->id;
        $assocEntity->save();
        return $image;
    }

    public function PatchImage(ImageFormRequest $request)
    {
        $image = Image::where('uuid', $request->uuid)->first();

        if ($request->image) {
            $assocEntity = Serial::where('image_id', $image->id)->first();
            $imageFolder = '/images/serials';
            if (!$assocEntity) {
                $assocEntity = Screening::where('image_id', $image->id)->first();
                $imageFolder = '/images/screenings';
            }
            if (!$assocEntity) {
                $assocEntity = Notice::where('image_id', $image->id)->first();
                $imageFolder = '/images/notices';
            }
            $imageName = $assocEntity->uuid . '.' .
                Helper::convertMime2Ext($request->image->getMimeType());
            $imagePath = $request->image->storeAs($imageFolder, $imageName, 'public');
            $image->path = $imagePath;
        }

        $image->alt_text = $request->altText;
        $image->copyright = $request->copyright;

        $image->save();
        return $image;
    }
}
