<?php
/**
 * Created by PhpStorm.
 * User: maksimbeketov
 * Date: 31.07.2018
 * Time: 23:10
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class InitialSeeder extends Seeder
{
    public function run() {
        User::query()->insert([
            [
                'name' => 'Петя Иванов',
                'email' => 'petya@gmail.com',
                'password' => Hash::make('petya123'),
            ],
            [
                'name' => 'Peter Johnson',
                'email' => 'peter@mail.ru',
                'password' => Hash::make('petr123'),
            ],
            [
                'name' => 'Orion',
                'email' => 'root@orion.dev',
                'password' => Hash::make('qweqwe'),
            ],
        ]);
    }
}
