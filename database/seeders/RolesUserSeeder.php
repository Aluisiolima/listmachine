<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles_users')->insert([
            [
                'nome' => 'Admin',
                'descricao' => 'Acesso total ao sistema. Pode gerenciar usuários, configurações, permissões e qualquer recurso.'
            ],
            [
                'nome' => 'manager',
                'descricao' => 'Pode gerenciar recursos importantes, mas não pode alterar configurações críticas do sistema ou permissões.'
            ],
            [
                'nome' => 'guest',
                'descricao' => 'Usuário não autenticado ou com permissões mínimas. Geralmente só pode visualizar páginas públicas.'
            ],
        ]);
    }
}
