<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('computers', function (Blueprint $table) {
            $table->id();
            $table->string("nome");
            $table->foreignId("locations_id")->constrained()->restrictOnDelete();
            $table->string("processador");
            $table->integer("memoria_ram_gb");
            $table->integer("armazenamento_gb");
            $table->string("sistema_operacional");
            $table->string("status");
            $table->text("observacoes");
            $table->timestamps();
        });

        Schema::table('qrcodes', function (Blueprint $table) {
            $table->foreignId('computer_id')->constrained()->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('computers');
        Schema::table('qrcode', function (Blueprint $table) {
            $table->dropForeign(['computer_id']);
            $table->dropColumn('computer_id');
        });
    }
};
