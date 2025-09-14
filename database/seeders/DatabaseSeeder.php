<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Reda',
            'email' => 'reda@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,

        ]);
        User::factory()->create([
            'name' => 'Ahmed',
            'email' => 'ahmed@example.com',
            'password' => bcrypt('password'),
        ]);
        User::factory(10)->create();
        for ($i = 0; $i < 5; $i++) {
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);
            $users = User::inRandomOrder()->limit(rand(2, 5))->pluck('id');
            $group->users()->attach(array_unique([1, ...$users]));
        }
        Message::factory(count: 50)->create();
        // take only 1 to 1 mesagges
        $messages = Message::whereNull('group_id')->orderBy('created_at')->get();
        // $table->foreignId('sender_id')->constrained('users');
        // $table->foreignId('reciever_id')->nullable()->constrained('users');
        // $table->foreignId('conversation_id')->nullable()->constrained('conversations');
        $conversations = $messages->GroupBy(function ($message) {
            return collect([$message->sender_id, $message->reciever_id])->sort()->implode("_");// 1_2, 1_3, 2,3
        })->map(function ($groupedMessages) {
            return [
                'user_id1' => $groupedMessages->first()->sender_id,
                'user_id2' => $groupedMessages->first()->reciever_id,
                'last_message_id' => $groupedMessages->last()->id,
                'created_at' => new Carbon(),
                'updated_at' => new Carbon(),

            ];
        })->values();
        Conversation::insertOrIgnore($conversations->toArray());
    }
}
