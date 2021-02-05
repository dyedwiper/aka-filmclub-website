<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function GetImageById(int $id)
    {
        return Image::where('id', $id)->first();
    }
}
