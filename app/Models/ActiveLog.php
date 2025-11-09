<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveLog extends Model
{
    /** @use HasFactory<\Database\Factories\ActiveLogFactory> */
    use HasFactory;

    protected $table = "active_logs";

    protected $fillable = [
        "user_id",
        "acao",
    ];
}
