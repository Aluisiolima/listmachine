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
        return redirect()->route('computer.index');
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
            'locations'
        ])->find($id);

        if ($computer == null) return redirect('dashboard');

        return Inertia::render('computer/computer-show', [
            'computer' => $computer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Computer $computer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComputerRequest $request, Computer $computer)
    {
        //
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
