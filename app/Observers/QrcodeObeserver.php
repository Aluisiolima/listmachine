<?php

namespace App\Observers;

use App\Models\ActiveLog;
use App\Models\Qrcode;
use Illuminate\Support\Facades\Auth;

class QrcodeObeserver
{
    /**
     * Handle the Qrcode "created" event.
     */
    public function created(Qrcode $qrcode): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "criou o qrcode {$qrcode->id}"
        ]);
    }

    /**
     * Handle the Qrcode "updated" event.
     */
    public function updated(Qrcode $qrcode): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "editou o qrcode {$qrcode->id}"
        ]);
    }

    /**
     * Handle the Qrcode "deleted" event.
     */
    public function deleted(Qrcode $qrcode): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou o qrcode {$qrcode->id}"
        ]);
    }

    /**
     * Handle the Qrcode "restored" event.
     */
    public function restored(Qrcode $qrcode): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "restarou o qrcode {$qrcode->id}"
        ]);
    }

    /**
     * Handle the Qrcode "force deleted" event.
     */
    public function forceDeleted(Qrcode $qrcode): void
    {
        ActiveLog::create([
            'user_id' => Auth::id(),
            'acao' => "deletou forçadamente o qrcode {$qrcode->id}"
        ]);
    }
}
