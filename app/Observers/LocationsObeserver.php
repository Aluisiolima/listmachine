<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\Locations;
use Illuminate\Support\Facades\Auth;

class LocationsObeserver
{
    /**
     * Handle the Locations "created" event.
     */
    public function created(Locations $locations): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o locations {$locations->id}"
        ]);
    }

    /**
     * Handle the Locations "updated" event.
     */
    public function updated(Locations $locations): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o locations {$locations->id}"
        ]);
    }

    /**
     * Handle the Locations "deleted" event.
     */
    public function deleted(Locations $locations): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o locations {$locations->id}"
        ]);
    }

    /**
     * Handle the Locations "restored" event.
     */
    public function restored(Locations $locations): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o locations {$locations->id}"
        ]);
    }

    /**
     * Handle the Locations "force deleted" event.
     */
    public function forceDeleted(Locations $locations): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o locations {$locations->id}"
        ]);
    }
}
