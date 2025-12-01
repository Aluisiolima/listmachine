<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaintenanceRecordsRequest;
use App\Http\Requests\UpdateMaintenanceRecordsRequest;
use App\Models\Computer;
use App\Models\MaintenanceRecords;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MaintenanceRecordsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(int $computer_id)
    {
        $computer = Computer::findOrFail($computer_id, ['id', 'nome']);

        return Inertia::render('maintenance_records/maintenance-records', [
            "computer_id" => $computer->id,
            "user_id" => Auth::id(),
            "computer_nome" => $computer->nome, 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceRecordsRequest $request)
    {
        MaintenanceRecords::create($request->validated());

        return redirect()->route('computer.show', ['id' => $request->computer_id])
                        ->with('success', 'Maintenance record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenanceRecords $maintenanceRecords)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $maintenance_id)
    {
        $maintenanceRecords = MaintenanceRecords::findOrFail($maintenance_id);

        return Inertia::render('maintenance_records/maintenance-records-edit', [
            "revision" => $maintenanceRecords,
            "computer_nome" => $maintenanceRecords->computer->nome, 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceRecordsRequest $request, MaintenanceRecords $maintenanceRecords)
    {
        $maintenanceRecords->update($request->validated());

        return redirect()->route('computer.show', ['id' => $maintenanceRecords->computer_id])
                        ->with('success', 'Maintenance record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $maintenanceRecords = MaintenanceRecords::findOrFail($id);
        $computer_id = $maintenanceRecords->computer_id;
        $maintenanceRecords->delete();

        return redirect()->route('computer.show', ['id' => $computer_id])
                        ->with('success', 'Maintenance record deleted successfully.');
    }
}
