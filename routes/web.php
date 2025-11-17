<?php

use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\RolesUser;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $roleAdmin = RolesUser::find(1);

        $policy = new UserPolicy();

        return Inertia::render('dashboard', [
            'isAdmin' => $policy->check_level($user, $roleAdmin),
        ]);
        
})->name('dashboard');
});

require __DIR__.'/settings.php';
