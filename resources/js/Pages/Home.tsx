import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageInput from '@/Components/App/MessageInput';
import MessageItem from '@/Components/App/MessageItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { usePage } from '@inertiajs/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Home({ selectedConversation = null, messages = null }: { selectedConversation: any, messages: any }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messageCtrRef: any = useRef<HTMLDivElement | null>(null);
    console.log("messages", messages)
    console.log('selectedMessages', selectedConversation)
    useEffect(() => {
        if (messages)
            setLocalMessages(messages.reverse())
    }, [messages])

    useEffect(() => {
        setTimeout(() => {
            if (messageCtrRef)
                messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight
        }, 10);
    }, [selectedConversation]);



    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-center items-center text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-26 mt-10 text-slate-200">
                        Please Select Conversation to see Messages
                    </div>
                    <ChatBubbleLeftRightIcon className='w-32 h-32 inline-block' />
                </div>
            )}{
                messages && (
                    <>
                        <ConversationHeader selectedConversation={selectedConversation} />

                        <div className="flex-1 overflow-y-auto p-5"
                            ref={messageCtrRef}
                        >
                            {/* Messages */}
                            {localMessages?.length === 0 && (
                                <div className="flex justify-center items-center h-full">
                                    <div className="text-lg text-slate-200">
                                        No message found
                                    </div>
                                </div>

                            )}{
                                localMessages?.length > 0 && (
                                    <div className="flex-1 flex flex-col ">
                                        {
                                            localMessages.map((message: any) => (
                                                <MessageItem key={message.id}
                                                    message={message} />
                                            ))
                                        }
                                    </div>

                                )
                            }

                        </div>
                        <MessageInput conversation={selectedConversation} />
                    </>
                )
            }

        </>
    );
}
Home.layout = (page: any) => {
    return (
        <AuthenticatedLayout
        >
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    )
}
export default Home;
