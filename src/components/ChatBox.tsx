'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatBoxProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
}

export default function ChatBox({
    messages,
    onSendMessage,
    isLoading = false,
}: ChatBoxProps) {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const inputBgColor = isDark ? 'bg-gray-700' : 'bg-white';
    const inputBorderColor = isDark ? 'border-gray-600' : 'border-gray-300';
    const inputTextColor = isDark ? 'text-white' : 'text-gray-900';
    const placeholderColor = isDark ? 'placeholder-gray-400' : 'placeholder-gray-500';
    const textColor = isDark ? 'text-gray-400' : 'text-gray-500';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className={`flex flex-col h-full ${bgColor} rounded-lg shadow-sm`}>
            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar'>
                {messages.length === 0 ? (
                    <div className={`text-center ${textColor} mt-8`}>
                        <div className='text-6xl mb-4'>💬</div>
                        <h3 className='text-lg font-medium'>Start chatting!</h3>
                        <p className='text-sm'>
                            Send messages or write HTML/CSS/JS code
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                    ))
                )}
                {isLoading && (
                    <div className={`flex items-center space-x-2 ${textColor}`}>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
                        <span className='text-sm'>Typing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`border-t ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'} p-4 rounded-b-lg`}>
                <form onSubmit={handleSubmit} className='flex space-x-2'>
                    <input
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='Type your message or send HTML/CSS/JS code...'
                        className={`flex-1 px-4 py-2 border ${inputBorderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgColor} ${inputTextColor} ${placeholderColor}`}
                        disabled={isLoading}
                    />
                    <button
                        type='submit'
                        disabled={!inputValue.trim() || isLoading}
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                        <PaperAirplaneIcon className='h-5 w-5' />
                    </button>
                </form>
            </div>
        </div>
    );
}
