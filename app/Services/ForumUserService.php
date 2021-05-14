<?php

namespace App\Services;

use App\Models\ForumUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;

class ForumUserService
{
    public function PostUser(Request $request)
    {
        $group_id = Config::get('constants.forum_auth_level.registered');
        if ($request->level == Config::get('constants.auth_level.editor')) {
            $group_id = Config::get('constants.forum_auth_level.moderator');
        } elseif ($request->level == Config::get('constants.auth_level.admin')) {
            $group_id = Config::get('constants.forum_auth_level.admin');
        }

        // 'user_permissions' and 'user_sig' must be set here,
        // because there are problems with empty string as default value for TEXT fields. 
        // See https://bugs.mysql.com/bug.php?id=13794.
        $user = new ForumUser([
            'user_regdate' => time(),
            'group_id' => $group_id,
            'user_permissions' => '',
            'username' => $request->username,
            'username_clean' => strtolower($request->username),
            'user_password' => Hash::make(env('STANDARD_PASSWORD')),
            'user_email' => $request->email,
            'user_sig' => '',
        ]);

        $user->save();
    }
}
