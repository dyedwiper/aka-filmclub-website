<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoticeController extends Controller
{
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
}
