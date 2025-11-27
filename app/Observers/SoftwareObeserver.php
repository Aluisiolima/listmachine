<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\Software;
use Illuminate\Support\Facades\Auth;

class SoftwareObeserver
{
    /**
     * Handle the Software "created" event.
     */
    public function created(Software $software): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o software {$software->id}"
        ]);
    }

    /**
     * Handle the Software "updated" event.
     */
    public function updated(Software $software): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o software {$software->id}"
        ]);
    }

    /**
     * Handle the Software "deleted" event.
     */
    public function deleted(Software $software): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o software {$software->id}"
        ]);
    }

    /**
     * Handle the Software "restored" event.
     */
    public function restored(Software $software): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o software {$software->id}"
        ]);
    }

    /**
     * Handle the Software "force deleted" event.
     */
    public function forceDeleted(Software $software): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o software {$software->id}"
        ]);
    }
}
