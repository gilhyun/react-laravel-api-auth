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

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback(Request $request, $provider)
    {
        $social_user = Socialite::driver($provider)->user();
        $user = User::where('email', $social_user['email'])->first();
        if (!$user) {
            $user = new User([
                'email' => $social_user['email'],
                'name' => $social_user['name'],
                'password' => bcrypt('123'),
            ]);
            $user->save();
        }
//        auth()->login($user);

        $request->request->add([
            'username' => $user->email,
            'password' => '123',
            'grant_type' => 'password',
            'client_id' => env('CLIENT_ID'),
            'client_secret' => env('CLIENT_SECRET'),
            'scope' => '*',
        ]);
        $tokenRequest = Request::create('/oauth/token','post', $request->all());
        $result = Route::dispatch($tokenRequest);
        var_dump(json_decode($result->getContent(), true));
//        setcookie('LB_TOKEN', $token);
//        dd($token);
    }
}
