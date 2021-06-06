<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordFormRequest;
use App\Http\Requests\UserFormRequest;
use App\Models\PhpbbUser;
use App\Models\User;
use App\Services\ForumUserService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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

    public function GetCurrentUser(Request $request)
    {
        return Auth::user();
    }

    public function GetUserByUuid(Request $request)
    {
        return User::where('uuid', $request->uuid)->first();
    }

    public function PostLogin(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Auth::user();
        }
        return response('false creds', 401);
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

        $this->forumUserService->PostUser($request);

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

        $this->forumUserService->PatchUser($request, $user);
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
        $this->forumUserService->PatchPassword($request, $user);
        $user->password = Hash::make($request->new_password);
        $user->save();
    }

    public function DeleteUser(string $uuid)
    {
        if (Auth::user()->level != Config::get('constants.auth_level.admin')) {
            abort(401);
        }
        $user = User::firstWhere('uuid', $uuid);
        $this->forumUserService->DeleteUser($user->username);
        $user->delete();
    }

    // This function is only used during migration from the old website. It can be deleted afterwards.
    public function UpdateUuids()
    {
        $users = User::all();
        foreach ($users as $user) {
            if (!$user->uuid) {
                $user->uuid = uniqid();
                $user->save();
            }
        }
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
