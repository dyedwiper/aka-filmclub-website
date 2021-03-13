<?php

use App\Http\Controllers\FaqController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SerialController;
use App\Http\Controllers\TextController;
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

    Route::middleware('auth:sanctum')->post('/', [
        ScreeningController::class, 'PostScreening'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        ScreeningController::class, 'PatchScreening'
    ]);

    Route::delete('/uuid/{uuid}', [
        ScreeningController::class, 'DeleteScreening'
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

    Route::middleware('auth:sanctum')->post('/', [
        NoticeController::class, 'PostNotice'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        NoticeController::class, 'PatchNotice'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        NoticeController::class, 'DeleteNotice'
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

    Route::middleware('auth:sanctum')->post('/', [
        SerialController::class, 'PostSerial'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        SerialController::class, 'PatchSerial'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        SerialController::class, 'DeleteSerial'
    ]);
});

Route::prefix('images')->group(function () {
    Route::get('/id/{id}', [
        ImageController::class, 'GetImageById'
    ]);

    Route::get('/uuid/{uuid}', [
        ImageController::class, 'GetImageByUuid'
    ]);

    Route::middleware('auth:sanctum')->post('/', [
        ImageController::class, 'PostImage'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        ImageController::class, 'PatchImage'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        ImageController::class, 'DeleteImage'
    ]);
});

Route::prefix('users')->group(function () {
    Route::middleware('auth:sanctum')->get('/', [
        UserController::class, 'GetUsers'
    ]);

    Route::middleware('auth:sanctum')->get('/phpbb', [
        UserController::class, 'GetPhpbbUsers'
    ]);

    Route::get('/currentUser', [
        UserController::class, 'GetCurrentUser'
    ]);

    Route::middleware('auth:sanctum')->get('/uuid/{uuid}', [
        UserController::class, 'GetUserByUuid'
    ]);

    Route::post('/login', [
        UserController::class, 'PostLogin'
    ]);

    Route::get('/logout', [
        UserController::class, 'GetLogout'
    ]);

    Route::middleware('auth:sanctum')->get('/update_uuids', [
        UserController::class, 'UpdateUuids'
    ]);

    Route::middleware('auth:sanctum')->get('/updateLevels', [
        UserController::class, 'UpdateLevels'
    ]);

    Route::middleware('auth:sanctum')->get('/updateStati', [
        UserController::class, 'UpdateStati'
    ]);

    Route::middleware('auth:sanctum')->post('/', [
        UserController::class, 'PostUser'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        UserController::class, 'PatchUser'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        UserController::class, 'DeleteUser'
    ]);
});

Route::prefix('faqs')->group(function () {
    Route::get('/', [
        FaqController::class, 'GetFaqs'
    ]);

    Route::get('/uuid/{uuid}', [
        FaqController::class, 'GetFaqByUuid'
    ]);

    Route::middleware('auth:sanctum')->post('/', [
        FaqController::class, 'PostFaq'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        FaqController::class, 'PatchFaq'
    ]);
});

Route::prefix('texts')->group(function () {
    Route::get('/{page}', [
        TextController::class, 'GetText'
    ]);

    Route::middleware('auth:sanctum')->post('/{page}', [
        TextController::class, 'PostText'
    ]);
});
