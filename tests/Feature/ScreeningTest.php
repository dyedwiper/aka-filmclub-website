<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ScreeningTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_getScreeningsBySemester()
    {
        $season = 'ws';
        $year = 2018;
        $response = $this->get('/api/screenings/semester/' . $season . '/' . $year);

        $response->assertJsonCount(49);
        $response->assertStatus(200);
    }

    public function test_postScreening()
    {
        $response = $this->post('/api/screenings');

        $response->assertStatus(200);
    }
}
