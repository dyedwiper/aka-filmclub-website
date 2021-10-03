<?php

namespace App\Services;

use App\Models\ForumUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;

class ForumUserService
{
    public function PostUser(Request $request)
    {
        // 'user_permissions' and 'user_sig' must be set here,
        // because there are problems with empty string as default value for TEXT fields. 
        // See https://bugs.mysql.com/bug.php?id=13794.
        $forumUser = new ForumUser([
            'user_regdate' => time(),
            'group_id' => $this->ComputeGroupId($request->level),
            'user_permissions' => '',
            'username' => $request->username,
            'username_clean' => strtolower($request->username),
            'user_password' => Hash::make(env('STANDARD_PASSWORD')),
            'user_email' => $request->email,
            // 'user_rank' is 1 based.
            'user_rank' => $request->status + 1,
            'user_sig' => '',
        ]);

        $forumUser->save();
    }

    public function PatchUser(Request $request, User $user)
    {
        $forumUser = ForumUser::firstWhere('username_clean', strtolower($user->username));
        if (!$forumUser) return;

        // Check for null, because the level is send as null, when the select in the user form is disabled.
        // Also check if the authenticated user is admin, in order to prevent users from changing their own group_id.
        if ($request->level != null && Auth::user()->level == Config::get('constants.auth_level.admin')) {
            $forumUser->group_id = $this->ComputeGroupId($request->level);
        }
        $forumUser->username = $request->username;
        $forumUser->username_clean = strtolower($request->username);
        $forumUser->user_email = $request->email;
        // 'user_rank' is 1 based.
        $forumUser->user_rank = $request->status + 1;

        $forumUser->save();
    }

    public function PatchPassword(Request $request, User $user)
    {
        $forumUser = ForumUser::firstWhere('username_clean', strtolower($user->username));
        $forumUser->user_password = Hash::make($request->new_password);
        $forumUser->save();
    }

    public function DeleteUser(string $username)
    {
        $forumUser = ForumUser::firstWhere('username_clean', strtolower($username));
        if (!$forumUser) return;
        $forumUser->delete();
    }

    private function ComputeGroupId(int $level)
    {
        $group_id = Config::get('constants.forum_auth_level.registered');
        if ($level == Config::get('constants.auth_level.admin')) {
            $group_id = Config::get('constants.forum_auth_level.admin');
        }
        return $group_id;
    }
}
