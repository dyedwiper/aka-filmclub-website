<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use App\Models\PhpbbUser;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function GetUsers()
    {
        return User::select('id', 'uuid', 'username', 'realname', 'status')->get();
    }

    public function getPhpbbUsers()
    {
        return PhpbbUser::all();
    }

    public function GetCurrentUser(Request $request)
    {
        return Auth::user();
    }

    public function GetUserByUuid(Request $request)
    {
        return User::where('uuid', $request->uuid)->first();
    }

    public function postLogin(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Auth::user();
        }

        return response('false creds', 401);
    }

    public function getLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return 'logged out';
    }

    public function PostUser(UserFormRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'unique:users',
        ]);
        if ($validator->fails()) {
            throw new HttpResponseException(response()->json(['validationErrors' => $validator->errors()->all()], 422));
        }

        $user = new User([
            'uuid' => uniqid(),
            'username' => $request->username,
            'password' => Hash::make(env('STANDARD_PASSWORD')),
            'realname' => $request->realname,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'zipcode' => $request->zipcode,
            'city' => $request->city,
            'level' => $request->level,
            'status' => $request->status,
        ]);

        $user->save();
        return $user;
    }

    public function PatchUser(UserFormRequest $request)
    {
        $user = User::where('uuid', $request->uuid)->first();

        $user->username = $request->username;
        $user->realname = $request->realname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->zipcode = $request->zipcode;
        $user->city = $request->city;
        // The level is send as null when input in the user form is disabled.
        // That's why it is checked here first.
        if ($user->level) {
            $user->level = $request->level;
        }
        $user->status = $request->status;

        $user->save();
        return $user;
    }

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

    public function UpdateLevels()
    {
        $phpbbUsers = PhpbbUser::all();
        $users = User::all();

        foreach ($users as $user) {
            $phpbbUser = $phpbbUsers->firstWhere('user_id', $user->id);

            if ($phpbbUser->user_level == 1 || $phpbbUser->user_level == 2) {
                $user->level = 1;
            } elseif ($phpbbUser->user_level == 3) {
                $user->level = 2;
            }

            $user->save();
        }
    }

    public function UpdateStati()
    {
        $phpbbUsers = PhpbbUser::all();
        $users = User::all();

        foreach ($users as $user) {
            $phpbbUser = $phpbbUsers->firstWhere('user_id', $user->id);

            if ($phpbbUser->user_rank == 199 || $phpbbUser->user_rank == 200) {
                $user->status = 1;
            } elseif ($phpbbUser->user_rank > 200) {
                $user->status = 2;
            }

            $user->save();
        }
    }
}
