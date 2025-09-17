import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TextInput from "@/Components/TextInput";
import ConversationItem from "@/Components/App/ConversationItem";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const page = usePage();
    const conversations:any = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState<any>({})
    const [localConversations, setLocalConversations] = useState<any>([])
    const [sortedConversations, setSortedConversations] = useState<any>([])

    const isUserOnline = (userId: any) => onlineUsers[userId]


    useEffect(() => {
        const channel = window.Echo.join('online')
            .here((users: any[]) => {
                const onlineUsersObject = Object.fromEntries(users.map((user) => [user.id, user]))// to convert this into a map
                setOnlineUsers((prev: any) => {
                    return { ...prev, ...onlineUsersObject };
                })
                // console.log('here', users);
            })
            .joining((user: any) => {

                setOnlineUsers((prev: any) => {
                    const updatedUsers = { ...prev };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                })
                // console.log('joining', user);
            })
            .leaving((user: any) => {
                setOnlineUsers((prev: any) => {
                    const updatedUsers = { ...prev };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                })
                // console.log('leaving', user);
            })
            .error((error: any) => {
                console.error('error', error)
            })

        return () => {
            window.Echo.leave('online');
        };
    }, []);

    useEffect(() => {
        setLocalConversations(conversations)
    }, [conversations]);

    useEffect(() => {
        setSortedConversations(
            [...localConversations].sort((a: any, b: any) => {
                if (a.blocked_at && b.blocked_at) {
                    return new Date(a.blocked_at).getTime() - new Date(b.blocked_at).getTime();
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime();
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                }

                return 0;
            })
        );
    }, [localConversations]);

    console.log(localConversations)
    const onSearch = (ev:any) => {
        const search = ev.target.value;
        setLocalConversations(
            conversations.filter((conv:any)=>{
                return (
                    conv.name.toLowerCase().includes(search)
                );
            })
        )

    }

    return (
        <>
            <div className="flex-1 flex w-full overflow-hidden">
                <div className={`transition-all w-full sm:w-[330px] md:w-[350px] bg-slate-800 flex flex-col overflow-hidden ${selectedConversation ? '-ml-[100%] sm:ml-0' : ''}`}>
                    <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
                        My Conversations
                        <div className="tooltip tooltip-left" data-tip='Create new Group'>
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput onKeyUp={onSearch} placeholder="Filter users and groups"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations && sortedConversations.map((conv: any) => (
                            <ConversationItem key={`${conv.is_group ? 'group_' : 'user_'}${conv.id}`}
                            conversation={conv}
                            online={!!isUserOnline(conv.id)}
                            selectedConversation={selectedConversation}

                            />))
                        }

                    </div>

                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>

            </div>
        </>
    )
}
