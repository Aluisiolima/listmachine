<?php

namespace App\Providers;

use App\Models\Computer;
use App\Observers\ComputerObserver;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Computer::observe(ComputerObserver::class);
    }
}
