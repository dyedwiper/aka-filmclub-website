<?php

namespace App\Http\Controllers;

use App\Http\Requests\TextFormRequest;
use App\Models\Text;

class TextController extends Controller
{
    public function GetText(string $page)
    {
        return Text::firstWhere('page', $page);
    }

    public function PostText(TextFormRequest $request, string $page)
    {
        $text = Text::firstWhere('page', $page);
        $text->updated_by = $request->updated_by;
        $text->text = $request->text;
        $text->save();
    }
}
