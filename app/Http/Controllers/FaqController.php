<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqFormRequest;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

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
            'position' => Faq::all()->count(),
        ]);
        $faq = $this->mapRequestToFaq($request, $faq);
        $faq->save();
        return $faq;
    }

    public function PatchFaq(FaqFormRequest $request)
    {
        $faq = Faq::firstWhere('uuid', $request->uuid);
        $faq = $this->mapRequestToFaq($request, $faq);

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
        return $faq;
    }

    public function DeleteFaq(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $faq = Faq::firstWhere('uuid', $uuid);
        $afterPositionedFaqs = Faq::where('position', '>', $faq->position)->get();
        foreach ($afterPositionedFaqs as $afterFaq) {
            $afterFaq->position = $afterFaq->position - 1;
            $afterFaq->save();
        }
        $faq->delete();
    }

    private function mapRequestToFaq(Request $request, Faq $faq)
    {
        $faq->updated_by = $request->updated_by;
        $faq->question = $request->question;
        $faq->answer = $request->answer;

        return $faq;
    }
}
