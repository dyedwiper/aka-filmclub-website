<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SelfmadeFilmController;
use App\Http\Controllers\SerialController;
use App\Http\Controllers\TextController;
use App\Http\Controllers\UserController;
use App\Models\Screening;
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

    Route::get('/', [
        ScreeningController::class, 'GetScreenings'
    ]);

    Route::get('/future', [
        ScreeningController::class, 'GetFutureScreenings'
    ]);

    Route::get('/uuid/{uuid}', [
        ScreeningController::class, 'GetScreeningByUuid'
    ]);

    Route::get('semester/{semester}', [
        ScreeningController::class, 'GetScreeningsBySemester'
    ]);

    Route::get('search/{search}', [
        ScreeningController::class, 'GetScreeningsBySearchString'
    ]);

    Route::middleware('auth:sanctum')->post('/', [
        ScreeningController::class, 'PostScreening'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        ScreeningController::class, 'PatchScreening'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
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

    Route::get('/future', [
        SerialController::class, 'GetCurrentAndFutureSerials'
    ]);

    Route::get('/semester/{semester}', [
        SerialController::class, 'GetSerialsBySemester'
    ]);

    Route::get('/uuid/{uuid}', [
        SerialController::class, 'GetSerialByUuid'
    ]);

    Route::get('search/{search}', [
        SerialController::class, 'GetSerialsBySearchString'
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

    Route::middleware('auth:sanctum')->post('/wysiwyg', [
        ImageController::class, 'PostImageFromWysiwygEditor'
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
    Route::middleware('auth:sanctum')->post('/', [
        UserController::class, 'PostUser'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        UserController::class, 'PatchUser'
    ]);

    Route::middleware('auth:sanctum')->patch('/password', [
        UserController::class, 'PatchPassword'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        UserController::class, 'DeleteUser'
    ]);

    Route::middleware('auth:sanctum')->get('/update_uuids', [
        UserController::class, 'UpdateUuids'
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

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        FaqController::class, 'DeleteFaq'
    ]);
});

Route::prefix('selfmadeFilms')->group(function () {
    Route::get('/', [
        SelfmadeFilmController::class, 'GetSelfmadeFilms'
    ]);

    Route::get('/uuid/{uuid}', [
        SelfmadeFilmController::class, 'GetSelfmadeFilmByUuid'
    ]);

    Route::middleware('auth:sanctum')->post('/', [
        SelfmadeFilmController::class, 'PostSelfmadeFilm'
    ]);

    Route::middleware('auth:sanctum')->patch('/', [
        SelfmadeFilmController::class, 'PatchSelfmadeFilm'
    ]);

    Route::middleware('auth:sanctum')->delete('/uuid/{uuid}', [
        SelfmadeFilmController::class, 'DeleteSelfmadeFilm'
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

Route::middleware('auth:sanctum')->prefix('distributors')->group(function () {
    Route::get('/', [
        DistributorController::class, 'GetDistributors'
    ]);

    Route::get('/uuid/{uuid}', [
        DistributorController::class, 'GetDistributorByUuid'
    ]);

    Route::post('/', [
        DistributorController::class, 'PostDistributor'
    ]);

    Route::patch('/', [
        DistributorController::class, 'PatchDistributor'
    ]);

    Route::delete('/uuid/{uuid}', [
        DistributorController::class, 'DeleteDistributor'
    ]);
});

Route::middleware('auth:sanctum')->prefix('billings')->group(function () {
    Route::get('/semester/{semester}', [
        BillingController::class, 'GetScreeningsWithBillingsBySemester'
    ]);

    Route::get('/uuid/{uuid}', [
        BillingController::class, 'GetBillingByUuid'
    ]);

    Route::post('/', [
        BillingController::class, 'PostBilling'
    ]);

    Route::patch('/', [
        BillingController::class, 'PatchBilling'
    ]);

    Route::delete('/uuid/{uuid}', [
        BillingController::class, 'DeleteBilling'
    ]);
});

Route::middleware('auth:sanctum')->prefix('licenses')->group(function () {
    Route::get('/', [
        LicenseController::class, 'GetLicenses'
    ]);

    Route::get('/uuid/{uuid}', [
        LicenseController::class, 'GetLicenseByUuid'
    ]);

    Route::post('/', [
        LicenseController::class, 'PostLicense'
    ]);

    Route::patch('/', [
        LicenseController::class, 'PatchLicense'
    ]);

    Route::delete('/uuid/{uuid}', [
        LicenseController::class, 'DeleteLicense'
    ]);
});
