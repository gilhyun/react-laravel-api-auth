<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function socialLogin(Request $request) {
        $credentials = $request->all();
        $user = User::where([
            ['is_social', true],
            ['social_uid', $credentials['sub']],
        ])->first();
        if (!$user) {
            $user = new User([
                'email' => $credentials['nickname'] . '@localhost',
                'name' => $credentials['name'],
                'password' => bcrypt(env('FACEBOOK_SECRET')),
                'is_social' => true,
                'social_uid' => $credentials['sub'],
            ]);
            $user->save();
        }

        $request->request->add([
            'username' => $user->email,
            'password' => env('FACEBOOK_SECRET'),
            'grant_type' => 'password',
            'client_id' => env('CLIENT_ID'),
            'client_secret' => env('CLIENT_SECRET'),
            'scope' => '*',
        ]);
        $tokenRequest = Request::create('/oauth/token','post', $request->all());
        $result = json_decode(Route::dispatch($tokenRequest)->getContent(), true);

        return [
            'status' => 'ok',
            'access_token' => $result['access_token'],
        ];
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback(Request $request, $provider)
    {
        $social_user = Socialite::driver($provider)->user();
        return response()->json($social_user);
//        $user = User::where('email', $social_user['email'])->first();
//        if (!$user) {
//            $user = new User([
//                'email' => $social_user['email'],
//                'name' => $social_user['name'],
//                'password' => bcrypt('123'),
//            ]);
//            $user->save();
//        }
////        auth()->login($user);
//
//        $request->request->add([
//            'username' => $user->email,
//            'password' => '123',
//            'grant_type' => 'password',
//            'client_id' => env('CLIENT_ID'),
//            'client_secret' => env('CLIENT_SECRET'),
//            'scope' => '*',
//        ]);
//        $tokenRequest = Request::create('/oauth/token','post', $request->all());
//        $result = json_decode(Route::dispatch($tokenRequest)->getContent(), true);
//        return response()->toJson($result);
//        dd($token);
    }
}
