<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\MaintenanceRecords;
use Illuminate\Support\Facades\Auth;

class MaintenanceRecordsObeserver
{
    /**
     * Handle the MaintenanceRecords "created" event.
     */
    public function created(MaintenanceRecords $maintenanceRecords): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o maintenance_records {$maintenanceRecords->id}"
        ]);
    }

    /**
     * Handle the MaintenanceRecords "updated" event.
     */
    public function updated(MaintenanceRecords $maintenanceRecords): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o maintenance_records {$maintenanceRecords->id}"
        ]);
    }

    /**
     * Handle the MaintenanceRecords "deleted" event.
     */
    public function deleted(MaintenanceRecords $maintenanceRecords): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o maintenance_records {$maintenanceRecords->id}"
        ]);
    }

    /**
     * Handle the MaintenanceRecords "restored" event.
     */
    public function restored(MaintenanceRecords $maintenanceRecords): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o maintenance_records {$maintenanceRecords->id}"
        ]);
    }

    /**
     * Handle the MaintenanceRecords "force deleted" event.
     */
    public function forceDeleted(MaintenanceRecords $maintenanceRecords): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o maintenance_records {$maintenanceRecords->id}"
        ]);
    }
}
