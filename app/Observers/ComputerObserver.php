<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\Computer;
use Illuminate\Support\Facades\Auth;

class ComputerObserver
{
    /**
     * Handle the Computer "created" event.
     */
    public function created(Computer $computer): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o computador {$computer->id}"
        ]);
    }

    /**
     * Handle the Computer "updated" event.
     */
    public function updated(Computer $computer): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o computador {$computer->id}"
        ]);
    }

    /**
     * Handle the Computer "deleted" event.
     */
    public function deleted(Computer $computer): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o computador {$computer->id}"
        ]);
    }

    /**
     * Handle the Computer "restored" event.
     */
    public function restored(Computer $computer): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restaurou o computador {$computer->id}"
        ]);
    }

    /**
     * Handle the Computer "force deleted" event.
     */
    public function forceDeleted(Computer $computer): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "forcou o delete do computador {$computer->id}"
        ]);
    }
}
