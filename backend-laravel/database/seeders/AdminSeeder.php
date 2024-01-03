<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admin')->insert([
            [
                'name' => 'admin 1',
                'username' => 'admin1',
                'password' => 'admin'
            ],
            [
                'name' => 'admin 2',
                'username' => 'admin2',
                'password' => 'admin'
            ],
            [
                'name' => 'admin 3',
                'username' => 'admin3',
                'password' => 'admin'
            ],
        ]);
    }
}
