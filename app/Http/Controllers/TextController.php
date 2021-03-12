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

    public function PostAboutText(Request $request)
    {
        Storage::disk('texts')->delete('about_backup.txt');
        Storage::disk('texts')->copy('about.txt', 'about_backup.txt');
        Storage::disk('texts')->put('about.txt', $request->text);
    }
}
