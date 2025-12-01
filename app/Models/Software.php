<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Software extends Model
{
    /** @use HasFactory<\Database\Factories\SoftwareFactory> */
    use HasFactory;

    protected $table = "software";

    protected $fillable = [
        "computer_id",
        "nome",
        "observacoes"
    ];

    public function computer()
    {
        return $this->belongsTo(Computer::class, 'computer_id');
    }
}
