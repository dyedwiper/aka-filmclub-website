<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Requests\ImageFormRequest;
use App\Models\Image;
use App\Models\Serial;
use Illuminate\Http\Request;

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

    public function PatchImage(ImageFormRequest $request)
    {
        $image = Image::where('uuid', $request->uuid)->first();

        if ($request->associatedEntity == 'serial') {
            $associatedEntity = Serial::where('image_id', $image->id)->first();
            $imageFolder = '/images/serials';
        }

        $imageName = $associatedEntity->uuid . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs($imageFolder, $imageName, 'public');

        $image->source = $imagePath;
        $image->title = $request->imageTitle;
        $image->alt_text = $request->altText;
        $image->copyright = $request->copyright;

        $image->save();
        return $image;
    }
}
