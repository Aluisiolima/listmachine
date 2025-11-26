<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    use HasFactory;

    protected $table = "locations";

    protected $fillable = [
        "nome",
        "descricao"
    ];

    public function computers()
    {
        return $this->hasMany(Computer::class, 'locations_id', 'id');
    }
}
