<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqFormRequest;
use App\Models\Faq;

class FaqController extends Controller
{
    public function GetFaqs()
    {
        return Faq::orderBy('position')->get();
    }

    public function PostFaq(FaqFormRequest $request)
    {
        $faq = new Faq([
            'uuid' => uniqid(),
            'question' => $request->question,
            'answer' => $request->answer,
            'position' => Faq::all()->count(),
        ]);
        $faq->save();
        return $faq;
    }
}
