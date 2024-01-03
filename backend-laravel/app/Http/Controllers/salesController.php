<?php

namespace App\Http\Controllers;

use App\Models\sales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class salesController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function updateSales(Request $request, $id)
    {
        try {
            $affected = DB::table('sales')->where('id', $id)->update($request->all());

            if ($affected > 0) {
                $sale = DB::table('sales')->where('id', $id)->first();
                return response()->json(['data' => $sale], 200);
            } else {
                return response()->json(['msg' => "Sale with id $id not found"], 404);
            }
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
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
    public function show(sales $sales)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, sales $sales)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(sales $sales)
    {
        //
    }
}
