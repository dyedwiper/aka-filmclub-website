<?php

namespace Tests\Unit;

use App\Helpers\Helper;
use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase
{
    public function test_prepareTitle()
    {
        $string = 'Hüsker Dü ist 1   naiße Bänd öder nicht???';
        $expected = 'huesker_due_ist';
        $result = Helper::prepareTitle($string);
        $this->assertSame($result, $expected);
    }
}
