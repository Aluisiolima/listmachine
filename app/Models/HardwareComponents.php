<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HardwareComponents extends Model
{
    /** @use HasFactory<\Database\Factories\HardwareComponentsFactory> */
    use HasFactory;

    protected $table = "hardware_components";

    protected $fillable = [
        "computer_id",
        "tipo",
        "modelo",
        "capacidade",
        "status"
    ];

    public function computer()
    {
        return $this->belongsTo(Computer::class);
    }
}
