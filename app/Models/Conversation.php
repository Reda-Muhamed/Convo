<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable=[
        'user_id1',
        'user_id2',
        'last_message_id'
    ];
    /**
     * Get the lastmessage that owns the Conversation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lastmessage(): BelongsTo
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }
    /**
     * Get the user that owns the Conversation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user1(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id1');
    }
    public function user2(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id2');
    }
    public static function getConversationForSidebar(User $user){
        $users =User::getUsersExceptUser($user);
        $groups =Group::getGroupsforUser($user);
        return $users->map(function(User $userr){
            return $userr->toConversationArray();
        })->concat($groups->map(function (Group $group){
            return $group->toConversationArray();
        } ));
    }
    public static function updateConversationWithMessage($userId1,$userId2,$message){
        
    }
}
