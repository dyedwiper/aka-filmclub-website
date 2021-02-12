<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Models\Image;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;

class ImageService
{
    public function storeSerialImage(Request $request, Serial $serial)
    {
        $imageName = $serial->uuid . '_' .
            Helper::prepareTitle($serial->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/serials', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeScreeningImage(Request $request, Screening $screening)
    {
        $imageName = $screening->uuid . '_' .
            Helper::prepareTitle($screening->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/screenings', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
    }

    public function storeNoticeImage(Request $request, Notice $notice)
    {

        $imageName = $notice->uuid . '_' .
            Helper::prepareTitle($notice->title) . '.' .
            Helper::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/notices', $imageName, 'public');
        return $this->storeImage($request, $imagePath);
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
