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
