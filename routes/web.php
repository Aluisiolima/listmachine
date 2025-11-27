<?php

use App\Http\Controllers\ComputerController;
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

    Route::get('dashboard/computer/', [ComputerController::class, 'index'])->name('computer.index');
    Route::get('computer/create/', [ComputerController::class, 'create'])->name('computer.create');
    Route::get('computer/{id}/show/', [ComputerController::class, 'show'])->name('computer.show');
    Route::post('computer/store/', [ComputerController::class, 'store'])->name('computer.store');

    Route::delete('computer/{id}/delete/', [ComputerController::class, 'destroy'])->name('computer.destroy');
});

require __DIR__.'/settings.php';
