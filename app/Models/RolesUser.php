<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolesUser extends Model
{
    /** @use HasFactory<\Database\Factories\RolesUserFactory> */
    use HasFactory;

    protected $table = "roles_users";

    protected $fillable = [
        "nome",
        "descricao"
    ];
}
