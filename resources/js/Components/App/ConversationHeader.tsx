import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";

interface ConversationHeaderProps {
    selectedConversation: any;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
    selectedConversation,
}) => {
    return (
        <>
            {
                selectedConversation && (
                    <div className="flex items-center justify-between p-3 border-b border-slate-700 bg-gray-800">
                        <div className="flex items-center gap-3">
                            <Link className="sm:hidden p-2 hover:bg-gray-700 rounded-lg" href={route('dashboard')}>
                                <ArrowLeftIcon className="w-5 h-5 text-gray-300" />
                            </Link>
                            {selectedConversation.is_user && (
                                <UserAvatar user={selectedConversation} />
                            )}
                            {selectedConversation.is_group && (
                                <GroupAvatar name={selectedConversation?.name || 'group'} />
                            )}
                            <h3>{selectedConversation.name}</h3>
                            {selectedConversation.is_group && (
                                <p className="text-xs text-gray-500">
                                    {
                                        selectedConversation.users.length
                                    } members
                                </p>
                            )}

                        </div>
                    </div>

                )

            }

        </>
    );
};

export default ConversationHeader;
