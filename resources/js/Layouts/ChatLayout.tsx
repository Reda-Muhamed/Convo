import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { useEffect } from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const page = usePage();
    const conversation = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;


    useEffect(() => {
        const channel = window.Echo.join('online')
            .here((users: any[]) => {
                console.log('here', users);
            })
            .joining((user: any) => {
                console.log('joining', user);
            })
            .leaving((user: any) => {
                console.log('leaving', user);
            })
            .error((error:any)=>{
                console.error('error' , error)
            })

        return () => {
            channel.leave();
        };
    }, []);

    return (
        <>
            Conversations

            <div className="">
                {children}
            </div>
        </>
    )
}
