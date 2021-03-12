<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TextController extends Controller
{
    public function GetAboutText()
    {
        return Storage::disk('texts')->get('about.txt');
    }
}
