<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Models\Image;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use App\Utils\ValidationUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageService
{
    public function storeSerialImage(Request $request, Serial $serial)
    {
        $this->validateImage($request);
        $imageName = $serial->uuid . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('/images/serials', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeScreeningImage(Request $request, Screening $screening)
    {
        $this->validateImage($request);
        $imageName = $screening->uuid . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('/images/screenings', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeNoticeImage(Request $request, Notice $notice)
    {
        $this->validateImage($request);
        $imageName = $notice->uuid . '.' .
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
                'altText' => 'max:255',
                'originator' => 'max:255',
            ],
            [],
            [
                'image' => 'Bild',
                'altText' => 'Alternativtext',
                'originator' => 'Urheber*in',
            ]
        );

        if ($validator->fails()) {
            ValidationUtils::handleValidationError($validator);
        }
    }

    private function storeImage(Request $request, string $imagePath)
    {
        $image = new Image([
            'uuid' => uniqid(),
            'path' => $imagePath,
            'alt_text' => $request->altText,
            'originator' => $request->originator,
        ]);
        $image->save();
        return $image->id;
    }
}
