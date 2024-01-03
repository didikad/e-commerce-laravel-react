<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

class authController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function loginAdmin(Request $request)
    {
        try {
            $username = $request->input('username');
            $password = $request->input('password');

            if (!$username || !$password) {
                throw new \Exception("Anda harus mengisi username dan password");
            }

            $existingAdmin = $this->findAdminByUsername($username);

            if (!$existingAdmin) {
                throw new \Exception("Username tidak ditemukan");
            }

            if ($password !== $existingAdmin->password) {
                throw new \Exception("Password yang anda masukan salah");
            }

            $accessToken = $this->createToken($existingAdmin);

            return response()->json(['accessToken' => $accessToken, 'msg' => 'login admin success'], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }

    private function findAdminByUsername($username)
    {
        return DB::table('admin')->where('username', $username)->first();
    }

    private function createToken($admin)
    {
        $payload = [
            'userId' => $admin->id,
        ];

        return JWT::encode($payload, env('JWT_ACCESS_SECRET'), 'HS256');
    }
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Auth $auth)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Auth $auth)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Auth $auth)
    {
        //
    }
}
