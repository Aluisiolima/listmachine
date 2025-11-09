<?php

namespace App\Policies;

use App\Models\HardwareComponents;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HardwareComponentsPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, HardwareComponents $hardwareComponents): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, HardwareComponents $hardwareComponents): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, HardwareComponents $hardwareComponents): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, HardwareComponents $hardwareComponents): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, HardwareComponents $hardwareComponents): bool
    {
        return false;
    }
}
