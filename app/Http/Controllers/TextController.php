<?php

namespace App\Http\Controllers;

use App\Models\Text;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TextController extends Controller
{
    public function GetText(string $page)
    {
        return Text::firstWhere('page', $page)->text;
    }

    public function PostText(Request $request, string $page)
    {
        $text = Text::firstWhere('page', $page);
        $text->text = $request->text;
        $text->save();
    }
}
