'use client';

import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import ChatBox from '@/components/ChatBox';
import CodeExamples from '@/components/CodeExamples';
import { Message } from '@/types/chat';
import { useTheme } from '@/contexts/ThemeContext';
import {
    parseCodeFromMessage,
    isCodeMessage,
    generateId,
} from '@/utils/codeParser';

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgGradient = isDark
        ? 'from-gray-900 to-gray-800'
        : 'from-blue-50 to-indigo-100';
    const textColor = isDark ? 'text-white' : 'text-gray-800';
    const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
    const iconColor = isDark ? 'text-blue-400' : 'text-blue-600';

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            id: generateId(),
            text,
            sender: 'user',
            type: isCodeMessage(text) ? 'code' : 'text',
            code: parseCodeFromMessage(text) || undefined,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        // Simulate system response
        setTimeout(() => {
            const systemMessage: Message = {
                id: generateId(),
                text: isCodeMessage(text)
                    ? 'Your code has been executed successfully! You can view the preview.'
                    : 'Your message has been received.',
                sender: 'system',
                type: 'text',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, systemMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleSelectExample = (code: string) => {
        // این تابع می‌تواند کد نمونه را در input قرار دهد
        // فعلاً فقط یک پیام سیستم ارسال می‌کنیم
        const systemMessage: Message = {
            id: generateId(),
            text: 'Selected code example:',
            sender: 'system',
            type: 'text',
            timestamp: new Date(),
        };

        const codeMessage: Message = {
            id: generateId(),
            text: code,
            sender: 'user',
            type: 'code',
            code: parseCodeFromMessage(code) || undefined,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, systemMessage, codeMessage]);
    };

    return (
        <div
            className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-colors duration-200`}>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='flex items-center justify-center mb-4'>
                        <ChatBubbleLeftRightIcon
                            className={`h-12 w-12 ${iconColor} mr-3`}
                        />
                        <h1 className={`text-4xl font-bold ${textColor}`}>
                            Chat Runner
                        </h1>
                    </div>
                    <p className={`text-lg ${textSecondary} max-w-2xl mx-auto`}>
                        Chat and run your HTML/CSS/JavaScript code live! Just
                        send your code in markdown format.
                    </p>
                </div>

                {/* Main Chat Area */}
                <div className='max-w-4xl mx-auto'>
                    <div
                        className={`${
                            isDark
                                ? 'bg-gray-800 border-gray-600'
                                : 'bg-white border-gray-200'
                        } rounded-xl shadow-lg overflow-hidden border`}>
                        <div className='h-[600px]'>
                            <ChatBox
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Instructions and Examples */}
                <div className='mt-8 max-w-6xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-8'>
                        {/* Instructions */}
                        <div
                            className={`${
                                isDark
                                    ? 'bg-gray-800 border-gray-600'
                                    : 'bg-white border-gray-200'
                            } rounded-lg p-6 shadow-sm border`}>
                            <h3
                                className={`text-lg font-semibold mb-4 ${textColor}`}>
                                How to use:
                            </h3>
                            <div className='space-y-4'>
                                <div>
                                    <h4
                                        className={`font-medium mb-2 ${textSecondary}`}>
                                        Send text message:
                                    </h4>
                                    <p className={`text-sm ${textSecondary}`}>
                                        Simply type your message and send it.
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className={`font-medium mb-2 ${textSecondary}`}>
                                        Send code:
                                    </h4>
                                    <p className={`text-sm ${textSecondary}`}>
                                        Send your HTML/CSS/JavaScript code in
                                        multiple ways:
                                    </p>
                                    <div
                                        className={`text-xs ${
                                            isDark
                                                ? 'bg-gray-700 text-gray-200'
                                                : 'bg-gray-100 text-gray-800'
                                        } p-3 rounded mt-2 space-y-2`}>
                                        <div>
                                            <strong>1. Standalone HTML:</strong>
                                            <pre className='mt-1'>{`<small>Hello World!</small>`}</pre>
                                        </div>
                                        <div>
                                            <strong>2. Standalone CSS:</strong>
                                            <pre className='mt-1'>{`body { color: blue; }`}</pre>
                                        </div>
                                        <div>
                                            <strong>
                                                3. Standalone JavaScript:
                                            </strong>
                                            <pre className='mt-1'>{`console.log("Hello!");`}</pre>
                                        </div>
                                        <div>
                                            <strong>4. Markdown format:</strong>
                                            <pre className='mt-1'>{`\`\`\`html
<div>Hello World!</div>
\`\`\``}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Code Examples */}
                        <CodeExamples onSelectExample={handleSelectExample} />
                    </div>
                </div>
            </div>
        </div>
    );
}
