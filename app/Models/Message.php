<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    use HasFactory;
    protected $fillable=[
        'message',
        'sender_id',
        'group_id',
        'reciever_id'
    ];
    public function sender():BelongsTo{
        return $this->belongsTo(User::class,'sender_id');
    }
    public function reciever():BelongsTo{
        return $this->belongsTo(User::class,'reciever_id');
    }
    /**
     * Get the group that owns the Message
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
    /**
     * Get all of the attachments for the Message
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(MessageAttachments::class);
    }
}
