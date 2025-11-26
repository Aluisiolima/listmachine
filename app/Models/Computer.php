<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Computer extends Model
{
    /** @use HasFactory<\Database\Factories\ComputerFactory> */
    use HasFactory;
    protected $table = "computers";

    protected $fillable = [
        "nome",
        "locations_id",
        "processador",
        "memoria_ram_gb",
        "armazenamento_gb",
        "sistema_operacional",
        "status",
        "observacoes"
    ];

    public function hardware_components()
    {
        return $this->hasMany(HardwareComponents::class, 'computer_id');
    }

    public function maintenance_records()
    {
        return $this->hasMany(MaintenanceRecords::class, 'computer_id');
    }

    public function software()
    {
        return $this->hasMany(Software::class, 'computer_id');
    }

    public function locations()
    {
        return $this->belongsTo(Locations::class, 'locations_id', 'id');
    }


}
