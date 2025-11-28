<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreHardwareComponentsRequest extends FormRequest
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
            "computer_id"   => "required|exists:computers,id",
            "tipo"          => "required|string|max:255",
            "modelo"        => "required|string|max:255",
            "capacidade"    => "integer|min:0",
            "status"        => "required|string|max:255"
        ];
    }
}
