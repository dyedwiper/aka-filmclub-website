<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeFormRequest;
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

    public function PostNotice(NoticeFormRequest $request)
    {
        $notice = new Notice([
            'uuid' => uniqid(),
            'title' => $request->title,
            'date' => $request->date,
            'content' => $request->content,
            'author' => $request->author,
        ]);

        if ($request->image) {
            $notice->image_id = $this->imageService->storeNoticeImage($request, $notice);
        }

        $notice->save();
        return $notice;
    }

    public function PatchNotice(NoticeFormRequest $request)
    {
        $notice = Notice::where('id', $request->id)->first();

        $notice->title = $request->title;
        $notice->date = $request->date;
        $notice->content = $request->content;
        $notice->author = $request->author;

        if ($request->image) {
            $notice->image_id = $this->imageService->storeNoticeImage($request, $notice);
        }

        $notice->save();
        return $notice;
    }
}
