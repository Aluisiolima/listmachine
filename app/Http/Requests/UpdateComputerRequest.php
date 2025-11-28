<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateComputerRequest extends FormRequest
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
            'nome'                => 'required|string',
            'processador'         => 'required|string',
            'memoria_ram_gb'      => 'required|integer',
            'armazenamento_gb'    => 'required|integer',
            'sistema_operacional' => 'required|string',
            'status'              => 'required|string',
            'observacoes'         => 'nullable|string',
            'locations_id'        => 'required|integer|exists:locations,id',
        ];
    }
}
