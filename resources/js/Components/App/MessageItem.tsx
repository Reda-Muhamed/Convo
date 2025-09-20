import React from "react";
import clsx from "clsx";
import { usePage } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";
import formatMessageDateLong from "@/helpers";
import ReactMarkdown from "react-markdown";

interface MessageItemProps {
    message: any;
    attachmentClick?: any;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, attachmentClick }) => {
    const currentUser = usePage().props.auth.user
    const isMine = message.sender_id === currentUser.id;

    return (
        <div
            className={clsx(
                "chat mb-1 ",
                isMine ? "chat-end" : "chat-start"
            )}
        >
            {<UserAvatar user={message.sender} />}
            <div
                className={'chat-header'}
            >
                {!isMine && (
                    message.sender.name
                )}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>

            </div>
            <div className={'chat-bubble relative  ' + (isMine ? ' chat-bubble-success bg-fuchsia-500/70 text-[#d6d6d6]' : 'chat-bubble-info bg-cyan-500/75 text-gray-900')}>
                <div className="chat-message">
                    <div className="chat-message-content text-[14px] md:text-[18px]">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
