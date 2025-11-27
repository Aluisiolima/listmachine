<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\HardwareComponents;
use Illuminate\Support\Facades\Auth;

class HardwareComponentsObeserver
{
    /**
     * Handle the HardwareComponents "created" event.
     */
    public function created(HardwareComponents $hardwareComponents): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o hardware_components {$hardwareComponents->id}"
        ]);
    }

    /**
     * Handle the HardwareComponents "updated" event.
     */
    public function updated(HardwareComponents $hardwareComponents): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o hardware_components {$hardwareComponents->id}"
        ]);
    }

    /**
     * Handle the HardwareComponents "deleted" event.
     */
    public function deleted(HardwareComponents $hardwareComponents): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o hardware_components {$hardwareComponents->id}"
        ]);
    }

    /**
     * Handle the HardwareComponents "restored" event.
     */
    public function restored(HardwareComponents $hardwareComponents): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o hardware_components {$hardwareComponents->id}"
        ]);
    }

    /**
     * Handle the HardwareComponents "force deleted" event.
     */
    public function forceDeleted(HardwareComponents $hardwareComponents): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o hardware_components {$hardwareComponents->id}"
        ]);
    }
}
