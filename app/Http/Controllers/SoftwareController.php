<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSoftwareRequest;
use App\Http\Requests\UpdateSoftwareRequest;
use App\Models\Computer;
use App\Models\Software;
use Inertia\Inertia;

class SoftwareController extends Controller
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

        return Inertia::render('software/software', [
            "computer_id" => $computer->id,
            "computer_nome" => $computer->nome,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSoftwareRequest $request)
    {
        Software::create($request->validated());

        return redirect()->route('computer.show', ['id' => $request->computer_id])
            ->with('success', 'Software adicionado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Software $software)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $software = Software::findOrFail($id);

        return Inertia::render('software/software-edit', [
            'software' => $software,
            "computer_nome" => $software->computer->nome,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSoftwareRequest $request, Software $software)
    {
        $software->update($request->validated());

        return redirect()->route('computer.show', ['id' => $software->computer_id])
            ->with('success', 'Software atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $software)
    {
        $software = Software::findOrFail($software);
        $computer_id = $software->computer_id;
        $software->delete();

        return redirect()->route('computer.show', ['id' => $computer_id])
            ->with('success', 'Software removido com sucesso.');
    }
}
