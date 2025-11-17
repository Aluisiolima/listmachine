<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesQrcodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles_qrcodes')->insert([
            [
                'tipo' => 'Admin',
                'descricao' => 'Acesso total ao sistema. Pode gerenciar permissões e qualquer recurso.'
            ],
            [
                'tipo' => 'manager',
                'descricao' => 'Pode gerenciar recursos importantes, mas não pode alterar configurações críticas do sistema ou permissões.'
            ],
            [
                'tipo' => 'guest',
                'descricao' => 'Usuário não autenticado ou com permissões mínimas. Geralmente só pode visualizar.'
            ],
        ]);
    }
}
