<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function GetImageById(int $id)
    {
        return Image::where('id', $id)->first();
    }

    public function PostImage(Request $request, string $type)
    {
        $imageName = $request->uuid . '_' . $request->title . '.' . Helper::mime2ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs('images/serials', $imageName, 'public');
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
