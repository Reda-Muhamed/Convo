<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Group extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'last_message_id'
    ];
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'group_users');
    }
    /**
     * Get all of the messages for the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
    /**
     * Get the owner associated with the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
   public function owner():BelongsTo
{
    return $this->belongsTo(User::class, 'owner_id');
}

}
