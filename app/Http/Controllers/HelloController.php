<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function hello(Request $request) {
        echo "API";
        return $this->ok();
    }
}
