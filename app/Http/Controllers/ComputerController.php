<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComputerRequest;
use App\Http\Requests\UpdateComputerRequest;
use App\Models\Computer;
use App\Models\Locations;
use App\Models\RolesUser;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roleAdmin = RolesUser::find(1);
        $computers = Computer::all();

        $policy = new UserPolicy();

        return Inertia::render('dashboard', [
            'isAdmin' => $policy->check_level(Auth::user(), $roleAdmin),
            'computers' => $computers,
            'component' => 'computer-card'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('computer/computer',
        ['locais' => Locations::select('id', 'nome')->get()]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComputerRequest $request)
    {
        Computer::create($request->validated());

        return redirect()->route('qrcode.store', [
            'computer_id' => Computer::latest()->first()->id
        ])->with('success', 'Computador criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $computer = Computer::with([
            'hardware_components',
            'maintenance_records',
            'software',
            'locations',
            'qrcode'
        ])->find($id);

        if ($computer == null) return redirect('dashboard');

        return Inertia::render('computer/computer-show', [
            'computer' => $computer,
            'isAdmin' => (new UserPolicy())->check_level(Auth::user(), RolesUser::find(1))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $computer = Computer::find($id);

        if ($computer == null) return redirect('dashboard');

        return Inertia::render('computer/computer-edit', [
            'computer' => $computer,
            'locais' => Locations::select('id', 'nome')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComputerRequest $request, Computer $computer)
    {
        $computer->update($request->validated());

        return redirect()->route('computer.show', ['id' => $computer->id])
                ->with('success', 'Computador atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        Computer::find($id)->delete();

        return redirect()->route('computer.index')
                ->with('success', 'Computador removido com sucesso!');
    }
}
