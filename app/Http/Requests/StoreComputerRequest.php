<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreComputerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome'               => 'required|string|max:255',
            'locations_id'       => 'required|integer|exists:locations,id',
            'processador'        => 'required|string|max:255',
            'memoria_ram_gb'     => 'required|integer|min:1',
            'armazenamento_gb'   => 'required|integer|min:1',
            'sistema_operacional'=> 'required|string|max:255',
            'status'             => 'required|string|max:100',
            'observacoes'        => 'nullable|string|max:1000',
        ];
    }
}
