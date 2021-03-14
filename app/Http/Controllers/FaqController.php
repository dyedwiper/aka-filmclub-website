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

    public function GetFaqByUuid(string $uuid)
    {
        return Faq::firstWhere('uuid', $uuid);
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

    public function PatchFaq(FaqFormRequest $request)
    {
        $faq = Faq::firstWhere('uuid', $request->uuid);
        $faq->question = $request->question;
        $faq->answer = $request->answer;
        if ($faq->position > $request->position) {
            $afterPositionedFaqs = Faq
                ::where('position', '>=', $request->position)
                ->where('position', '<', $faq->position)
                ->get();
            foreach ($afterPositionedFaqs as $afterFaq) {
                $afterFaq->position = $afterFaq->position + 1;
                $afterFaq->save();
            }
        } elseif ($faq->position < $request->position) {
            $beforePositionedFaqs = Faq
                ::where('position', '<=', $request->position)
                ->where('position', '>', $faq->position)
                ->get();
            foreach ($beforePositionedFaqs as $beforeFaq) {
                $beforeFaq->position = $beforeFaq->position - 1;
                $beforeFaq->save();
            }
        }
        $faq->position = $request->position;
        $faq->save();
    }
}
