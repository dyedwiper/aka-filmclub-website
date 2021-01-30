<?php

use App\Http\Controllers\ScreeningController;
use App\Models\Notice;
use App\Models\Screening;
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
        ScreeningController::class, 'GetSingleScreening'
    ]);

    Route::get('/update_uuids', [
        ScreeningController::class, 'UpdateUuids'
    ]);
});

Route::get('/notices', function () {
    return Notice::all();
});
