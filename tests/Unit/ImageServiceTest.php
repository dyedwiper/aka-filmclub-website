<?php

namespace Tests\Unit;

use App\Services\ImageService;
use PHPUnit\Framework\TestCase;

class ImageServiceTest extends TestCase
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function test_storeScreeningImage()
    {
        $screening = 
        $this->imageService->storeScreeningImage()
    }
}
