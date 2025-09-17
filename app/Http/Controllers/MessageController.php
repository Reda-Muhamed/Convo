<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\MessageAttachments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Str;

class MessageController extends Controller
{
    public function byUser(User $user)
    {
        $messages = Message::where(function ($q) use ($user) {
            $q->where('sender_id', auth()->id)
                ->where('reciever_id', $user->id);
        })
            ->orWhere(function ($q) use ($user) {
                $q->where('sender_id', $user->id)
                    ->where('reciever_id', auth()->id);
            })
            ->latest()
            ->paginate(50);

        return Inertia::render('Home', [
            'selectedConversation' => $user->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);
    }
    public function byGroup(Group $group)
    {
        $messages = Message::where('group_id', $group->id)
            ->latest()
            ->paginate(50);

        return Inertia::render('Home', [
            'selectedConversation' => $group->toConversationArray(),
            'messages' => MessageResource::collection($messages),
        ]);
    }

    public function loadOlder(Message $message)
    {
        $messages = Message::where(function ($q) use ($message) {
            if ($message->group_id) {
                $q->where('group_id', $message->group_id);
            } else {
                $q->where(function ($q2) use ($message) {
                    $q2->where('sender_id', $message->sender_id)
                        ->where('reciever_id', $message->reciever_id);
                })
                    ->orWhere(function ($q2) use ($message) {
                        $q2->where('sender_id', $message->reciever_id)
                            ->where('reciever_id', $message->sender_id);
                    });
            }
        })
            ->where('created_at', '<', $message->created_at)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return MessageResource::collection($messages);
    }


    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();

        $data['sender_id'] = auth()->id();
        $receiverId = $data['reciever_id'] ?? null;
        $groupId    = $data['group_id'] ?? null;
        $files      = $data['attachments'] ?? [];
        $message = Message::create($data);
        if ($files) {
            foreach ($files as $file) {
                $dir = 'attachments/' . \Illuminate\Support\Str::random(32);
                Storage::makeDirectory($dir);
                $model = [
                    'message_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($dir, 'public'),
                ];
                $attachment = MessageAttachments::create($model);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }


        if ($receiverId) {
            Conversation::updateConversationWithMessage($receiverId, auth()->id(), $message);
        }
        if ($groupId) {
            Group::updateGroupWithMessage($groupId, $message);
        }
        // the event that will make reverb push the message into browser
        SocketMessage::dispatch($message);

        return new MessageResource($message);
    }

    public function destroy(Message $message) {
        if($message->sender_id !==auth()->id()){
            return response()->json(['message'=>'Forbidden'],403);

        }
        // we need observer to delete the attachment for this message also
        $message->delete();
        return response('',204);
    }
}
