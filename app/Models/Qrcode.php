<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qrcode extends Model
{
    /** @use HasFactory<\Database\Factories\QrcodeFactory> */
    use HasFactory;

    protected $table = "qrcodes";
    
    protected $fillable = [
        "computer_id",
        "roles_id", 
        "is_ativo",
        "path"
    ];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return $this->path ? asset("storage/{$this->path}") : null;
    }

    public function role() 
    {
        return $this->belongsTo(RolesQrcode::class, 'roles_id');
    }

    public function computer() 
    {
        return $this->belongsTo(Computer::class, 'computer_id');
    }
}
