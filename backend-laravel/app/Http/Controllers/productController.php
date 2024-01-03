<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class productController extends Controller
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
        // return $request->all();
        // die();
        try {
            if ($request->hasFile('img')) {
                $file = $request->file('img');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('img'), $fileName);
            } else {
                $fileName = 'no_image.jpg';
            }

            $lastProduct = DB::table('product')->orderBy('code', 'desc')->first();

            $newCode = 'P1';

            if ($lastProduct) {
                $lastCode = $lastProduct->code;
                $numericPart = (int) substr($lastCode, 1);
                $newNumericPart = $numericPart + 1;
                $newCode = 'P' . $newNumericPart;
            }

            $product = [
                'code' => $newCode,
                'id_category' => $request->input('id_category'),
                'weight' => $request->input('weight'),
                'stock' => $request->input('stock'),
                'name' => $request->input('name'),
                'img' => $fileName,
                'id_parent' => $request->input('id_parent'),
                'price' => $request->input('price'),
                'price_discount' => $request->input('price_discount'),
                'type' => $request->input('type'),
                'status' => $request->input('status'),
                'description' => $request->input('description'),
                'variant' => $request->input('variant'),
            ];

            DB::table('product')->insert($product);

            return response()->json($product, 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }

    }

    public function getProduct(Request $request)
    {
        try {
            $product = DB::table('product')
                ->select('product.*', 'category.name as category_name')
                ->leftJoin('category', 'product.id_category', '=', 'category.id')
                ->get();

            $parentMap = [];

            foreach ($product as $product) {
                if ($product->type === "parent") {
                    $parentMap[$product->id] = $product;
                    $parentMap[$product->id]->children = [];
                } elseif ($product->type === "child" && isset($parentMap[$product->id_parent])) {
                    $parentMap[$product->id_parent]->children[] = $product;
                }
            }

            $parentProduct = array_values($parentMap);

            return response()->json($parentProduct, 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProduct(Request $request, $id)
    {
        // return $request->all();
        // die();
        try {
            $product = DB::table('product')->where('id', $id)->first();

            if ($request->hasFile('img')) {
                $file = $request->file('img');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('img'), $fileName);
                $imgFileName = $fileName;
            } else {
                $imgFileName = $product->img;
            }

            $updateData = [
                'id_category' => $request->input('id_category'),
                'weight' => $request->input('weight'),
                'stock' => $request->input('stock'),
                'name' => $request->input('name'),
                'id_parent' => $request->input('id_parent'),
                'price' => $request->input('price'),
                'price_discount' => $request->input('price_discount'),
                'type' => $request->input('type'),
                'status' => $request->input('status'),
                'description' => $request->input('description'),
                'variant' => $request->input('variant'),
                'img' => $imgFileName,
            ];

            $updateProduct = DB::table('product')->where('id', $id)->update($updateData);

            return response()->json($updateProduct, 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $deleted = DB::table('product')->where('id', $id)->delete();

            if ($deleted) {
                return response()->json(['msg' => "Product with id: $id deleted successfully"], 200);
            } else {
                return response()->json(['msg' => "Product with id: $id not found"], 404);
            }
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getProductAll(Request $request)
    {
        try {
            $product = DB::table('product')
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')
                ->get();

            $transformedProduct = $product->map(function ($product) {
                $product->category = ['name' => $product->category_name];
                return $product;
            });

            return response()->json(['data' => $transformedProduct], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getProductById(Request $request, $id)
    {
        try {
            $product = DB::table('product')
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')
                ->where('product.id', $id)
                ->first();

            $product->category = ['name' => $product->category_name];
            unset($product->category_name);

            return response()->json(['data' => $product], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function searchProduct(Request $request)
    {
        try {
            $query = $request->input('query');

            $product = DB::table('product')
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')
                ->where('product.type', 'parent')
                ->where(function ($q) use ($query) {
                    $q->where('product.name', 'like', '%' . $query . '%')
                        ->orWhere('product.description', 'like', '%' . $query . '%');
                })
                ->get();

            return response()->json(['data' => $product], 200);
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }

    public function getProductByIdParent(Request $request, $id)
    {
        try {
            $parentProduct = DB::table('product')
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')
                ->where('product.id', $id)
                ->first();

            if ($parentProduct->type === "parent") {
                $childProduct = DB::table('product')
                    ->join('category', 'product.id_category', '=', 'category.id')
                    ->select('product.*', 'category.name as category_name')
                    ->where('product.id_parent', $id)
                    ->get();

                $parentProduct->children = $childProduct;

                $response = ['data' => $parentProduct];
                return response()->json($response, 200);
            }
        } catch (\Exception $error) {
            return response()->json(['msg' => $error->getMessage()], 500);
        }
    }



}
