<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Models\Image;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ImageService
{
    public function storeSerialImage(Request $request, Serial $serial)
    {
        $this->validateImage($request);
        $imageName = $serial->uuid . '_' .
            Helper::prepareTitle($serial->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/serials', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeScreeningImage(Request $request, Screening $screening)
    {
        $this->validateImage($request);
        $imageName = $screening->uuid . '_' .
            Helper::prepareTitle($screening->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/screenings', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeNoticeImage(Request $request, Notice $notice)
    {
        $this->validateImage($request);
        $imageName = $notice->uuid . '_' .
            Helper::prepareTitle($notice->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('/images/notices', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    private function validateImage(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'image' => 'file|mimetypes:image/png,image/jpeg|max:1000',
                'imageTitle' => 'max:255',
                'altText' => 'max:255',
                'copyright' => 'max:255',
            ],
            [],
            [
                'image' => 'Bild',
                'imageTitle' => 'Titel des Bilds',
                'altText' => 'Alternativtext',
                'copyright' => 'Copyright',
            ]
        );

        if ($validator->fails()) {
            throw new HttpResponseException(response()->json($validator->errors(), 422));
        }
    }

    private function storeImage(Request $request, string $imagePath)
    {
        $image = new Image([
            'uuid' => uniqid(),
            'source' => $imagePath,
            'title' => $request->imageTitle,
            'alt_text' => $request->altText,
            'copyright' => $request->copyright,
        ]);
        $image->save();
        return $image->id;
    }
}
