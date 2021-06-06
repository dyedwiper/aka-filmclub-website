<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeFormRequest;
use App\Models\Notice;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

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
            ->orderByDesc('created_at')
            ->paginate(5);

        $notices->load('image');
        return $notices;
    }

    public function GetNoticesCount()
    {
        return Notice::all()->count();
    }

    public function GetNoticeByUuid(string $uuid)
    {
        return Notice::where('uuid', $uuid)->with('image.license')->first();
    }

    public function PostNotice(NoticeFormRequest $request)
    {
        $notice = new Notice(['uuid' => uniqid(),]);
        $notice = $this->mapRequestToNotice($request, $notice);

        if ($request->image) {
            $notice->image_id = $this->imageService->storeNoticeImage($request, $notice)->id;
        }

        $notice->save();
        return $notice;
    }

    public function PatchNotice(NoticeFormRequest $request)
    {
        $notice = Notice::where('uuid', $request->uuid)->first();
        $notice = $this->mapRequestToNotice($request, $notice);
        $notice->save();
        return $notice;
    }

    public function DeleteNotice(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(401);
        }
        $notice = Notice::firstWhere('uuid', $uuid);
        $image = $notice->image;

        $notice->delete();
        if ($image) {
            Storage::delete($image->path);
            $image->delete();
        }
    }

    // This function is only used during migration from the old website. It can be deleted afterwards.
    public function UpdateUuids()
    {
        $notices = Notice::all();
        foreach ($notices as $notice) {
            $notice->uuid = uniqid();
            $notice->save();
        }
    }

    private function mapRequestToNotice(Request $request, Notice $notice)
    {
        $notice->title = $request->title;
        $notice->date = $request->date;
        $notice->content = $request->content;
        $notice->author = $request->author;

        return $notice;
    }
}
