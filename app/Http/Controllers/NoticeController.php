<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NoticeController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetNotices()
    {
        $notices = Notice
            ::orderByDesc('date')
            ->orderByDesc('updated_at')
            ->orderByDesc('created_at')
            ->paginate(5);

        $notices->load('image');
        return $notices;
    }

    public function GetNoticesCount()
    {
        return Notice::all()->count();
    }

    public function PostNotice(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required|max:255',
                'date' => 'required|date',
                'content' => 'required',
                'author' => 'required|max:255',
            ],
            // Der leere Array muss hier stehen, weil die Parameter positioniert sind
            [],
            [
                'title' => 'Titel',
                'date' => 'Datum',
                'content' => 'Text',
                'author' => 'Autor*in',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['validationErrors' => $validator->errors()], 400);
        }

        $notice = new Notice([
            'uuid' => uniqid(),
            'title' => $request->title,
            'date' => $request->date,
            'content' => $request->content,
            'author' => $request->author,
        ]);

        try {
            $imageId = $this->imageService->storeNoticeImage($request, $notice);
            $notice->image_id = $imageId;
        } catch (ValidationException $ex) {
            return response()->json(['validationErrors' => $ex->validator->errors()], 400);
        }

        $notice->save();
        return 'Notice created';
    }
}
