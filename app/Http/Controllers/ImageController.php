<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageFormRequest;
use App\Models\Image;
use App\Models\Notice;
use App\Models\Screening;
use App\Models\Serial;
use App\Services\ImageService;
use App\Utils\MimeTypeUtils;
use App\Utils\ValidationUtils;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function GetImageByUuid(string $uuid)
    {
        return Image::where('uuid', $uuid)->with('screening', 'serial', 'notice', 'license')->first();
    }

    public function PostImage(ImageFormRequest $request)
    {
        // Der Check, ob ein Bild mitgeschickt wurde, findet hier statt und nicht im ImageFormRequest,
        // weil der Patch auch ohne Bild möglich ist
        $validator = Validator::make(
            $request->all(),
            ['image' => 'required'],
            [],
            ['image' => 'Bild']
        );
        if ($validator->fails()) {
            ValidationUtils::handleValidationError($validator);
        }

        switch ($request->assocType) {
            case 'serial':
                $assocEntity = Serial::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/serials';
                break;
            case 'screening':
                $assocEntity = Screening::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/screenings';
                break;
            case 'notice':
                $assocEntity = Notice::where('uuid', $request->assocUuid)->first();
                $imageFolder = '/images/notices';
                break;
        }
        $imageName = $request->assocUuid . '.' .
            MimeTypeUtils::convertMime2Ext($request->image->getMimeType());
        $imagePath = $request->image->storeAs($imageFolder, $imageName);

        $image = $this->imageService->storeImage($request, $imagePath);
        $assocEntity->image_id = $image->id;
        $assocEntity->save();
        return $image;
    }

    public function PatchImage(ImageFormRequest $request)
    {
        $image = Image::where('uuid', $request->uuid)->first();

        if ($request->image) {
            $assocEntity = Serial::where('image_id', $image->id)->first();
            $imageFolder = '/images/serials';
            if (!$assocEntity) {
                $assocEntity = Screening::where('image_id', $image->id)->first();
                $imageFolder = '/images/screenings';
            }
            if (!$assocEntity) {
                $assocEntity = Notice::where('image_id', $image->id)->first();
                $imageFolder = '/images/notices';
            }
            $imageName = $assocEntity->uuid . '.' .
                MimeTypeUtils::convertMime2Ext($request->image->getMimeType());
            $imagePath = $request->image->storeAs($imageFolder, $imageName);
            $image->path = $imagePath;
        }

        $image->updated_by = $request->updated_by;
        $image->alt_text = $request->altText;
        $image->originator = $request->originator;
        $image->link = $request->link;
        // Default must be set here, because an unchecked checkbox sends NULL
        // and it is not possible to actively insert NULL into NOT NULLABLE column.
        $image->keepShowingAfterSemester = $request->keepShowingAfterSemester ?? 0;
        $image->license_id = $request->license_id;

        $image->save();
        return $image;
    }

    public function DeleteImage(string $uuid)
    {
        if (Auth::user()->level < Config::get('constants.auth_level.editor')) {
            abort(403);
        }

        $image = Image::firstWhere('uuid', $uuid);

        $assocEntity = Serial::where('image_id', $image->id)->first();
        if (!$assocEntity) {
            $assocEntity = Screening::where('image_id', $image->id)->first();
        }
        if (!$assocEntity) {
            $assocEntity = Notice::where('image_id', $image->id)->first();
        }
        $assocEntity->image_id = null;
        $assocEntity->save();

        Storage::delete($image->path);
        $image->delete();
    }
}
