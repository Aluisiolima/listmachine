<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolesQrcode extends Model
{
    /** @use HasFactory<\Database\Factories\RolesQrcodeFactory> */
    use HasFactory;

    protected $table = "roles_qrcode";

    protected $fillable = [
        "tipo",
        "descricao"
    ];
}
