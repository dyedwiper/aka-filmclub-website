<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SerialController;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use Illuminate\Http\Request;
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
        ScreeningController::class, 'GetScreeningsBySerialFk'
    ]);

    Route::get('/year/{year}', [
        ScreeningController::class, 'GetScreeningsByYear'
    ]);

    Route::get('semester/{season}/{year}', [
        ScreeningController::class, 'GetScreeningsBySemester'
    ]);

    Route::get('/update_uuids', [
        ScreeningController::class, 'UpdateUuids'
    ]);
});

Route::prefix('notices')->group(function () {
    Route::get('/', [
        NoticeController::class, 'GetNotices'
    ]);

    Route::get('/count', [
        NoticeController::class, 'GetNoticesCount'
    ]);
});

Route::prefix('serials')->group(function () {
    Route::get('/', function () {
        return Serial::all();
    });

    Route::get('/semester/{season}/{year}', [
        SerialController::class, 'GetSerialsBySemester'
    ]);

    Route::get('/single/{uuid}', [
        SerialController::class, 'GetSerialByUuid'
    ]);

    Route::get('/update_uuids', [
        SerialController::class, 'UpdateUuids'
    ]);
});

Route::prefix('images')->group(function () {
    Route::get('/id/{id}', [
        ImageController::class, 'GetImageById'
    ]);
});
