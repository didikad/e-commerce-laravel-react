<?php

namespace App\Http\Controllers;

use App\Models\customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class customerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $customer = DB::table('customer')->insert($request->all());
            return response()->json(['data' => $customer], 201);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getCustomer(Request $request)
    {
        try {
            $customer = DB::table('customer')->get();
            return response()->json(['data' => $customer], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function updateCustomer(Request $request, $id)
    {
        try {
            $customer = DB::table('customer')->where('id', $id)->update($request->all());
            return response()->json(['data' => $customer], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function deleteCustomer(Request $request, $id)
    {
        try {
            $customer = DB::table('customer')->where('id', $id)->delete();
            return response()->json(['msg' => "Data Customer dengan id $id berhasil dihapus"], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(customer $customer)
    {
        //
    }
}
