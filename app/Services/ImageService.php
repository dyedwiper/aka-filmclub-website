<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Http\Requests\ImageFormRequest;
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
            ImageFormRequest::$ValidationRules,
            [],
            ImageFormRequest::$ValidationAttributes,
        );

        if ($validator->fails()) {
            ValidationUtils::handleValidationError($validator);
        }
    }

    public function storeImage(Request $request, string $imagePath)
    {
        $image = new Image([
            'uuid' => uniqid(),
            'path' => $imagePath,
            'alt_text' => $request->altText,
            'originator' => $request->originator,
            'link' => $request->link,
            // Default must be set here, because an unchecked checkbox sends NULL
            // and it is not possible to actively insert NULL into NOT NULLABLE column.
            'keepShowingAfterSemester' => $request->keepShowingAfterSemester ?? 0,
            'license_id' => $request->license_id,
        ]);
        $image->save();
        return $image;
    }
}
