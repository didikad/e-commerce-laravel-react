<?php

namespace App\Http\Controllers;

use App\Models\salesItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class salesItemController extends Controller
{

    public function createSalesItem(Request $request)
    {
        $salesItemsData = $request->all();

        DB::beginTransaction();

        try {
            $lastSales = DB::table('sales')->orderByDesc('id')->first();
            $newCode = "Inv1";

            if ($lastSales) {
                $lastCode = $lastSales->no_invoice;
                $numericPart = (int) substr($lastCode, 3);
                $newNumericPart = $numericPart + 1;
                $newCode = "Inv" . $newNumericPart;
            }


            $newCustomerId = DB::table('customer')->insertGetId([
                'name' => '',
                'email' => '',
                'address' => '',
                'no_wa' => '',
                'city' => '',
                'province' => '',
                'postal_code' => '',
                'username' => '',
                'password' => '',
            ]);



            // return $newCustomer;
            // die();
            $newSalesId = DB::table('sales')->insertGetId([
                'no_invoice' => $newCode,
                'code_status' => 1,
                'id_customer' => $newCustomerId,
                'delivery_name' => '',
                'delivery_cost' => 0,
                'total_pay' => 0,
                'price' => 0,
                'createdAt' => now(),
                'updatedAt' => now(),
            ]);




            $createdSalesItems = [];

            foreach ($salesItemsData as $salesItemData) {
                $product = DB::table('product')->where('id', $salesItemData['id_product'])->first();

                if ($product->stock < $salesItemData['qty']) {
                    DB::rollBack();
                    return response()->json(['data' => 'not enough stock'], 400);
                }


                $createdSalesItemId = DB::table('sales_item')->insertGetId([
                    'id_sales' => $newSalesId,
                    'id_customer' => $newCustomerId,
                    'id_product' => $salesItemData['id_product'],
                    'qty' => $salesItemData['qty'],
                    'price' => $product->price,
                    'ket' => '',
                ]);
                $createdSalesItem = DB::table('sales_item')->find($createdSalesItemId);

                DB::table('product')->where('id', $product->id)->decrement('stock', $salesItemData['qty']);

                $createdSalesItems[] = $createdSalesItem;

            }

            // return $createdSalesItems;
            // die();

            $totalItemPrice = array_reduce($createdSalesItems, function ($total, $item) {
                return $total + $item->price * $item->qty;
            }, 0);


            DB::table('sales')->where('id', $newSalesId)->update([
                'price' => $totalItemPrice,
                'total_pay' => $totalItemPrice + 0,
            ]);


            DB::commit();
            $newCustomer = DB::table('customer')->find($newCustomerId);
            $newSales = DB::table('sales')->find($newSalesId);
            return response()->json([
                'salesItems' => $createdSalesItems,
                'newSales' => $newSales,
                'newCustomer' => $newCustomer,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(salesItem $salesItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, salesItem $salesItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(salesItem $salesItem)
    {
        //
    }
}
