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
}
