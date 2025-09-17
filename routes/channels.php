<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

// this is responsible for the all channels
Broadcast::channel('online', function ($user) {
    return $user ? new UserResource($user) : null;
});
