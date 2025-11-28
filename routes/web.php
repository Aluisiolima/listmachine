<?php

use App\Http\Controllers\ComputerController;
use App\Http\Controllers\HardwareComponentsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect('dashboard/computer');
    })->name('dashboard');

    # Computer Management Routes
    Route::get('dashboard/computer/', [ComputerController::class, 'index'])->name('computer.index');
    Route::get('computer/create/', [ComputerController::class, 'create'])->name('computer.create');
    Route::get('computer/{id}/show/', [ComputerController::class, 'show'])->name('computer.show');
    Route::post('computer/store/', [ComputerController::class, 'store'])->name('computer.store');
    Route::delete('computer/{id}/delete/', [ComputerController::class, 'destroy'])->name('computer.destroy');
    Route::get('computer/{id}/edit/', [ComputerController::class, 'edit'])->name('computer.edit');
    Route::put('computer/{computer}/update/', [ComputerController::class, 'update'])->name('computer.update');

    # Hardware Components Management Routes
    Route::get('hardware/create/{computer_id}/', [HardwareComponentsController::class, 'create'])->name('hardware.create');
    Route::post('hardware/store/', [HardwareComponentsController::class, 'store'])->name('hardware.store');
    Route::get('hardware/{id}/edit/', [HardwareComponentsController::class, 'edit'])->name('hardware.edit');
    Route::put('hardware/{hardwareComponents}/update/', [HardwareComponentsController::class, 'update'])->name('hardware.update');
    Route::delete('hardware/{id}/delete/', [HardwareComponentsController::class, 'destroy'])->name('hardware.destroy');
});

require __DIR__.'/settings.php';
