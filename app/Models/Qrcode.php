<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qrcode extends Model
{
    /** @use HasFactory<\Database\Factories\QrcodeFactory> */
    use HasFactory;

    protected $table = "qrcode";
    
    protected $fillable = [
        "computer_id",
        "roles_id", 
        "is_ativo"
    ];
}
