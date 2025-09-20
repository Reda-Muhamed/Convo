import React, { useEffect, useRef } from 'react'

export default function NewMessageInput({ value, onChange, onSend }: { value: any, onChange: any, onSend: any }) {
    const input: any = useRef();
    const onInputKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend()
        }
    }
    const onChangeEvent = (e: any) => {
        setTimeout(() => {
            adjustHeight();
        }, 10);
        onChange(e);
    }
    const adjustHeight = () => {
        setTimeout(() => {
            input.current.style.height = 'auto'
            input.current.style.height = input.current.scrollHeight + 1 + 'px'
        }, 100);

    }
    useEffect(() => {
        adjustHeight()
    }, [value])


    return (
        <textarea ref={input} value={value}
            rows={1}
            placeholder='send a message'
            onKeyDown={onInputKeyDown}
            onChange={e => onChangeEvent(e)}
            className='input input-bordered w-full rounded-r-none resize-none overflow-hidden max-h-40 ring-0'
        >

        </textarea>
    )
}
