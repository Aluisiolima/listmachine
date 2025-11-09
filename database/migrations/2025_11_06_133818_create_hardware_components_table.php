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
        Schema::create('hardware_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId("computer_id")->constrained()->restrictOnDelete();
            $table->string("tipo");
            $table->string("modelo");
            $table->integer("capacidade")->nullable();
            $table->string("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hardware_components');
    }
};
