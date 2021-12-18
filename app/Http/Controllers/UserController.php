<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordFormRequest;
use App\Http\Requests\UserFormRequest;
use App\Models\User;
use App\Services\ForumUserService;
use DateTime;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    private $forumUserService;

    public function __construct(ForumUserService $forumUserService)
    {
        $this->forumUserService = $forumUserService;
    }

    public function GetUsers()
    {
        return User::select('id', 'uuid', 'username', 'realname', 'status')->get();
    }

    public function GetCurrentUser()
    {
        return Auth::user();
    }

    public function GetUserByUuid(Request $request)
    {
        return User::where('uuid', $request->uuid)->first();
    }

    public function PostLogin(Request $request)
    {
        $user = User::firstWhere('username', $request->username);
        if (!$user) abort(401);
        if (
            $user->failed_login_attempts >= env('MAX_FAILED_LOGIN_ATTEMPTS')
            && strtotime($user->login_forbidden_until) > strtotime('now')
        ) {
            abort(
                401,
                'Wegen zu vieler fehlgeschlagener Login-Versuche, ist dein Login für '
                    . env('LOCKOUT_TIME_IN_MINUTES') .
                    ' Minuten gesperrt.'
            );
        }

        $credentials = $request->only('username', 'password');
        if (Auth::attempt($credentials)) {
            $user->failed_login_attempts = 0;
            $user->login_forbidden_until = null;
            $user->save();
            $request->session()->regenerate();
            return Auth::user();
        }

        if (strtotime($user->login_forbidden_until) < strtotime('now')) {
            $user->failed_login_attempts = 0;
        }
        $user->failed_login_attempts++;
        // The time is always set here, but does not take effect until the max number of attempts is reached.
        $user->login_forbidden_until = new DateTime('+' . env('LOCKOUT_TIME_IN_MINUTES') . 'minutes');
        $user->save();
        abort(401);
    }

    public function GetLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return 'logged out';
    }

    public function PostUser(UserFormRequest $request)
    {
        // The uniqueness is checked here separately because it is checked differently on a patch request.
        $validator = Validator::make($request->all(), [
            'username' => 'unique:users',
        ]);
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()->all()], 422));
        }

        if (env('IS_FORUM_CONNECTED')) {
            $this->forumUserService->PostUser($request);
        }

        $user = new User([
            'uuid' => uniqid(),
            'password' => Hash::make(env('STANDARD_PASSWORD')),
            'level' => $request->level,
        ]);
        $user = $this->mapRequestToUser($request, $user);
        $user->save();
        return $user;
    }

    public function PatchUser(UserFormRequest $request)
    {
        $user = User::where('uuid', $request->uuid)->first();

        // The uniqueness is checked here separately because it must ignore the changed user on a patch request.
        $validator = Validator::make($request->all(), [
            'username' => Rule::unique('users')->ignore($user->id),
        ]);
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()->all()], 422));
        }

        if (env('IS_FORUM_CONNECTED')) {
            $this->forumUserService->PatchUser($request, $user);
        }

        $user = $this->mapRequestToUser($request, $user);

        // Check for null, because the level is send as null, when the select in the user form is disabled.
        // Also check if the authenticated user is admin, in order to prevent users from changing their own level.
        if ($request->level != null && Auth::user()->level == Config::get('constants.auth_level.admin')) {
            $user->level = $request->level;
        }

        $user->save();
        return $user;
    }

    public function PatchPassword(PasswordFormRequest $request)
    {
        $user = User::firstWhere('uuid', $request->uuid);
        if (env('IS_FORUM_CONNECTED')) {
            $this->forumUserService->PatchPassword($request, $user);
        }
        $user->password = Hash::make($request->new_password);
        $user->save();
    }

    public function DeleteUser(string $uuid)
    {
        if (Auth::user()->level != Config::get('constants.auth_level.admin')) {
            abort(403);
        }
        $user = User::firstWhere('uuid', $uuid);
        if (env('IS_FORUM_CONNECTED')) {
            $this->forumUserService->DeleteUser($user->username);
        }
        $user->delete();
    }

    private function mapRequestToUser(Request $request, User $user)
    {
        $user->updated_by = $request->updated_by;
        $user->username = $request->username;
        $user->realname = $request->realname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->zipcode = $request->zipcode;
        $user->city = $request->city;
        $user->status = $request->status;

        return $user;
    }
}
