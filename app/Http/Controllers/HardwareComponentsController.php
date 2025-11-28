<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHardwareComponentsRequest;
use App\Http\Requests\UpdateHardwareComponentsRequest;
use App\Models\Computer;
use App\Models\HardwareComponents;
use Inertia\Inertia;

class HardwareComponentsController extends Controller
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

        return Inertia::render('hardware_components/hardware-components', [
            'computer_id' => $computer->id,
            'computer_nome' => $computer->nome,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHardwareComponentsRequest $request)
    {
        HardwareComponents::create($request->validated());
        return redirect()->route('computer.show', ['id' => $request->computer_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(HardwareComponents $hardwareComponents)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $component = HardwareComponents::findOrFail($id);
        return inertia('hardware_components/hardware-components-edit', [
            'component' => $component,
            'computer_nome' => $component->computer->nome,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHardwareComponentsRequest $request, HardwareComponents $hardwareComponents)
    {
        $hardwareComponents->update($request->validated());
        return redirect()->route('computer.show', ['id' => $request->computer_id])
                ->with('success', 'Computador atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $hardwareComponents = HardwareComponents::findOrFail($id);
        $hardwareComponents->delete();
        return redirect()->route('computer.show', ['id' => $hardwareComponents->computer_id]);
    }
}
