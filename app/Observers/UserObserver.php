<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        ActiveLog::create([
            'user_id' => $user->id,
            'acao' => "criou o user {$user->id}"
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o user {$user->id}"
        ]);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o user {$user->id}"
        ]);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o user {$user->id}"
        ]);
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o user {$user->id}"
        ]);
    }
}
