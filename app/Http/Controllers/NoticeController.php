<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NoticeController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetNotices()
    {
        return DB::table('notices')
            ->orderByDesc('date')
            ->orderByDesc('updated_at')
            ->orderByDesc('created_at')
            ->paginate(5);
    }

    public function GetNoticesCount()
    {
        $notices = Notice::all();
        return count($notices);
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

        if ($request->image) {
            $imageId = $this->imageService->storeNoticeImage($request, $notice);
            $notice->image_id = $imageId;
        }

        $notice->save();
        return 'Notice created';
    }
}
