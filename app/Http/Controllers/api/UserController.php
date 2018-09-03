<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getCurrent(Guard $auth) {
        $user = $auth->user();
        return [
            'user' => $user,
        ];
    }

    public function create(Request $request) {
        $credentials = [
            'name' => $request->post('name'),
            'email' => $request->post('email'),
            'password' => $request->post('password'),
        ];
        $user = User::where('email', $credentials['email'])->first();
        if ($user) {
            return [
                'status' => 'error',
                'message' => 'user exist'
            ];
        }
        else {
            $credentials['password'] = Hash::make($credentials['password']);
            $user = new User($credentials);
            $user->save();
            return $this->ok();
        }
    }
}
