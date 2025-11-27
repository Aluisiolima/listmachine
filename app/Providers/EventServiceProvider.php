<?php

namespace App\Providers;

use App\Models\Computer;
use App\Models\HardwareComponents;
use App\Models\Locations;
use App\Models\MaintenanceRecords;
use App\Models\Qrcode;
use App\Models\Software;
use App\Models\User;
use App\Observers\ComputerObserver;
use App\Observers\HardwareComponentsObeserver;
use App\Observers\LocationsObeserver;
use App\Observers\MaintenanceRecordsObeserver;
use App\Observers\QrcodeObeserver;
use App\Observers\SoftwareObeserver;
use App\Observers\UserObserver;
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
        HardwareComponents::observe(HardwareComponentsObeserver::class);
        Locations::observe(LocationsObeserver::class);
        MaintenanceRecords::observe(MaintenanceRecordsObeserver::class);
        Qrcode::observe(QrcodeObeserver::class);
        Software::observe(SoftwareObeserver::class);
        User::observe(UserObserver::class);
    }
}
