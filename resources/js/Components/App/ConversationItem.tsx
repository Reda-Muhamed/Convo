import { Link, usePage } from "@inertiajs/react";
import React from "react";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import UserOptionsDropdown from "./UserOptionsDropdown";

interface ConversationItemProps {
    conversation: any;
    online: boolean;
    selectedConversation: any;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
    conversation,
    online,
    selectedConversation,
}) => {
    const currentUser: any = usePage().props.auth.user;

    const isSelected =
        selectedConversation?.id === conversation.id &&
        selectedConversation?.is_group === conversation.is_group;

    const classes = isSelected
        ? "border-l-4 border-blue-500 bg-gray-800/50"
        : "border-l-4 border-transparent hover:bg-gray-500/50";

    const href = conversation
        .is_group
        ? route("chat.group", conversation)
        : route("chat.user", conversation);

    // fallback name logic
    const displayName = conversation.is_group
        ? conversation.name
        : conversation.name || conversation.user_name || conversation.email;

    return (
        <Link
            href={href}
            preserveState
            preserveScroll
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all hover:bg-gray-600/75  text-gray-200 ${classes}`}
        >
            {/* Avatar */}
            {conversation.is_user && (
                <UserAvatar user={conversation} online={online} />
            )}
            {conversation.is_group && <GroupAvatar name={conversation.name} />}

            {/* Conversation Info */}
            <div
                className={`flex-1 min-w-0 ${conversation.is_user && conversation.blocked_at ? "opacity-50" : ""
                    }`}
            >
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-semibold truncate">{displayName}</h3>
                    {conversation.last_message_date && (
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {conversation.last_message_date}
                        </span>
                    )}
                </div>

                {conversation.last_message && (
                    <p className="text-xs text-gray-400 truncate">
                        {conversation.last_message}
                    </p>
                )}
            </div>

            {/* Admin dropdown */}
            {currentUser?.is_admin && conversation.is_user && (
                <div onClick={(e) => e.stopPropagation()}>
                    <UserOptionsDropdown conversation={conversation} />
                </div>
            )}
        </Link>
    );
};

export default ConversationItem;
