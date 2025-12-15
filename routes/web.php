<?php

use App\Http\Controllers\ComputerController;
use App\Http\Controllers\HardwareComponentsController;
use App\Http\Controllers\MaintenanceRecordsController;
use App\Http\Controllers\QrcodeController;
use App\Http\Controllers\SoftwareController;
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

    # Maintenance Records Management Routes
    Route::get('maintenance/create/{computer_id}/', [MaintenanceRecordsController::class, 'create'])->name('maintenance.create');
    Route::post('maintenance/store/', [MaintenanceRecordsController::class, 'store'])->name('maintenance.store');
    Route::get('maintenance/{id}/edit/', [MaintenanceRecordsController::class, 'edit'])->name('maintenance.edit');
    Route::put('maintenance/{maintenanceRecords}/update/', [MaintenanceRecordsController::class, 'update'])->name('maintenance.update');
    Route::delete('maintenance/{id}/delete/', [MaintenanceRecordsController::class, 'destroy'])->name('maintenance.destroy');

    # Software Management Routes
    Route::get('software/create/{computer_id}/', [SoftwareController::class, 'create'])->name('software.create');
    Route::post('software/store/', [SoftwareController::class, 'store'])->name('software.store');
    Route::get('software/{id}/edit/', [SoftwareController::class, 'edit'])->name('software.edit');
    Route::put('software/{software}/update/', [SoftwareController::class, 'update'])->name('software.update');
    Route::delete('software/{id}/delete/', [SoftwareController::class, 'destroy'])->name('software.destroy');

    Route::get('qrcode/{computer_id}/create', [QrcodeController::class, 'store'])->name('qrcode.store');
    Route::get('qrcode/{id}/', [QrcodeController::class, 'show'])->name('qrcode.show');
});

Route::get('computer/{id}/show/', [ComputerController::class, 'show'])->name('computer.show');

require __DIR__.'/settings.php';
