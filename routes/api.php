<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SerialController;
use App\Http\Controllers\UserController;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('screenings')->group(function () {

    Route::get('/', function () {
        return Screening::all();
    });

    Route::get('/future', [
        ScreeningController::class, 'GetFutureScreenings'
    ]);

    Route::get('/single/{uuid}', [
        ScreeningController::class, 'GetScreeningByUuid'
    ]);

    Route::get('/serial/{serialFk}', [
        ScreeningController::class, 'GetScreeningsBySerialId'
    ]);

    Route::get('/year/{year}', [
        ScreeningController::class, 'GetScreeningsByYear'
    ]);

    Route::get('semester/{semester}', [
        ScreeningController::class, 'GetScreeningsBySemester'
    ]);

    Route::get('/update_uuids', [
        ScreeningController::class, 'UpdateUuids'
    ]);

    Route::post('/', [
        ScreeningController::class, 'PostScreening'
    ]);

    Route::patch('/', [
        ScreeningController::class, 'PatchScreening'
    ]);
});

Route::prefix('notices')->group(function () {
    Route::get('/', [
        NoticeController::class, 'GetNotices'
    ]);

    Route::get('/count', [
        NoticeController::class, 'GetNoticesCount'
    ]);

    Route::get('/uuid/{uuid}', [
        NoticeController::class, 'GetNoticeByUuid'
    ]);

    Route::get('/update_uuids', [
        NoticeController::class, 'UpdateUuids'
    ]);

    Route::post('/', [
        NoticeController::class, 'PostNotice'
    ]);

    Route::patch('/', [
        NoticeController::class, 'PatchNotice'
    ]);
});

Route::prefix('serials')->group(function () {
    Route::get('/', [
        SerialController::class, 'GetSerials'
    ]);

    Route::get('/semester/{semester}', [
        SerialController::class, 'GetSerialsBySemester'
    ]);

    Route::get('/uuid/{uuid}', [
        SerialController::class, 'GetSerialByUuid'
    ]);

    Route::get('/update_uuids', [
        SerialController::class, 'UpdateUuids'
    ]);

    Route::get('/update_semesters', [
        SerialController::class, 'UpdateSemesters'
    ]);

    Route::post('/', [
        SerialController::class, 'PostSerial'
    ]);

    Route::patch('/', [
        SerialController::class, 'PatchSerial'
    ]);
});

Route::prefix('images')->group(function () {
    Route::get('/id/{id}', [
        ImageController::class, 'GetImageById'
    ]);

    Route::get('/uuid/{uuid}', [
        ImageController::class, 'GetImageByUuid'
    ]);

    Route::post('/', [
        ImageController::class, 'PostImage'
    ]);

    Route::patch('/', [
        ImageController::class, 'PatchImage'
    ]);
});

Route::prefix('users')->group(function () {
    Route::get('/', [
        UserController::class, 'GetUsers'
    ]);

    Route::get('/phpbb', [
        UserController::class, 'GetPhpbbUsers'
    ]);

    Route::get('/currentUser', [
        UserController::class, 'GetCurrentUser'
    ]);

    Route::get('/uuid/{uuid}', [
        UserController::class, 'GetUserByUuid'
    ]);

    Route::post('/login', [
        UserController::class, 'PostLogin'
    ]);

    Route::get('/logout', [
        UserController::class, 'GetLogout'
    ]);

    Route::get('/update_uuids', [
        UserController::class, 'UpdateUuids'
    ]);

    Route::get('/updateLevels', [
        UserController::class, 'UpdateLevels'
    ]);

    Route::get('/updateStati', [
        UserController::class, 'UpdateStati'
    ]);

    Route::post('/', [
        UserController::class, 'PostUser'
    ]);

    Route::patch('/', [
        UserController::class, 'PatchUser'
    ]);
});
