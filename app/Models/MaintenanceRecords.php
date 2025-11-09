<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRecords extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenanceRecordsFactory> */
    use HasFactory;

    protected $table = "maintenance_records";

    protected $fillable = [
        "computer_id",
        "user_id",
        "tipo",
        "descricao",
        "proxima_revisao"
    ];
}
