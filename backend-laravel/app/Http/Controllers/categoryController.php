<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class categoryController extends Controller
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
            $category = DB::table('category')->insert($request->all());
            return response()->json(['data' => $category], 201);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getCategory(Request $request)
    {
        try {
            $category = DB::table('category')->get();
            return response()->json(['data' => $category], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getCategoryById(Request $request, $id)
    {
        try {
            $category = DB::table('category')->where('id', $id)->first();
            return response()->json(['data' => $category], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function updateCategory(Request $request, $id)
    {
        try {
            $category = DB::table('category')->where('id', $id)->update($request->all());
            return response()->json(['data' => $category], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function deleteCategory(Request $request, $id)
    {
        try {
            $category = DB::table('category')->where('id', $id)->delete();
            return response()->json(['msg' => "Data Category dengan id $id berhasil dihapus"], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(category $category)
    {
        //
    }
}
