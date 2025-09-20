import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon, HandThumbUpIcon, PaperClipIcon, PhotoIcon } from "@heroicons/react/24/outline";
import NewMessageInput from "./NewMessageInput";
import axios from "axios";

interface MessageInputProps {
    conversation: any;
}

const MessageInput: React.FC<MessageInputProps> = ({
    conversation,
}) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const onSendClick = () => {
        if (newMessage.trim() === '') {
            setInputErrorMessage('please provide a message or upload attachments')
            setTimeout(() => {
                setInputErrorMessage('')
            }, 3000);
            return
        }
        const formData = new FormData();
        formData.append('message', newMessage);
        if (conversation.is_user) {
            formData.append('reciever_id', conversation.id)
        } else if (conversation.is_group) {
            formData.append('group_id', conversation.id)
        }
        setMessageSending(true)
        axios.post(route('message.store'), formData, {
            onDownloadProgress: (ProgressEvent) => {
                const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total!) * 100)
                console.log(progress)
            }
        }).then((res) => {
            setNewMessage('')
            setMessageSending(false)
        }).catch((error) => {
            setMessageSending(false)
            console.error(error)
        })

    }
    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-1 flex-1 xs:flex-none xs:order-1 p-2">
                <button className="p-1 cursor-pointer text-gray-400 hover:text-gray-300 relative ">
                    <PaperClipIcon className="w-6" />
                    <input type="file" multiple className="absolute w-full h-full left-0 top-0 right-0 bottom-0 z-20 cursor-pointer  opacity-0 " />
                </button>
                <button className="p-1 cursor-pointer text-gray-400 hover:text-gray-300 relative">
                    <PhotoIcon className="w-6" />
                    <input type="file" accept="image/*" multiple className="absolute w-full h-full left-0 top-0 right-0 bottom-0 z-20  opacity-0 cursor-pointer" />
                </button>
            </div>
            <div className="order-3 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2  flex-1 relative">
                <div className="flex">
                    <NewMessageInput
                        value={newMessage}
                        onChange={(e: any) => setNewMessage(e.target.value)}
                        onSend={onSendClick}

                    />
                    <button className="btn btn-info rounded-l-none" onClick={onSendClick}>
                        {
                            messageSending && (
                                <span className="loading loading-spinner loading-xs">

                                </span>
                            )
                        }
                        <PaperAirplaneIcon className="w-6" />
                        <span className="hiddn sm:inline">Send</span>
                    </button>
                </div>
                {
                    inputErrorMessage && (
                        <p className="text-xs text-red-400">{inputErrorMessage}</p>
                    )
                }

            </div>
            {/* //3 */}
            <div className="order-2 xs:order-3 p-2 flex">
                <button className="p-1 text-gray-400 hover:text-gray-300 ">
                    <HandThumbUpIcon className="w-6" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300 ">
                    <FaceSmileIcon className="w-6" />
                </button>
            </div>

        </div>





    );
};

export default MessageInput;
