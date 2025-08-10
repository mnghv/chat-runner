'use client';

import React, { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CodeBracketIcon,
} from '@heroicons/react/24/outline';
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
    const [showInstructions, setShowInstructions] = useState(true);
    const [showExamples, setShowExamples] = useState(true);
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
                <div className='max-w-6xl mx-auto'>
                    <div
                        className={`${
                            isDark
                                ? 'bg-gray-800 border-gray-600'
                                : 'bg-white border-gray-200'
                        } rounded-xl shadow-lg overflow-hidden border`}>
                        <div className='h-[700px]'>
                            <ChatBox
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Instructions and Examples */}
                <div className='mt-8 max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 gap-8'>
                        {/* Code Examples Accordion */}
                        <div
                            className={`${
                                isDark
                                    ? 'bg-gray-800 border-gray-600'
                                    : 'bg-white border-gray-200'
                            } rounded-lg shadow-sm border`}>
                            <button
                                onClick={() => setShowExamples(!showExamples)}
                                className={`w-full p-4 flex items-center justify-between ${
                                    isDark
                                        ? 'hover:bg-gray-700'
                                        : 'hover:bg-gray-50'
                                } transition-colors`}>
                                <h3
                                    className={`text-lg font-semibold ${textColor} flex items-center`}>
                                    <CodeBracketIcon className='h-5 w-5 mr-2' />
                                    Ready-to-use Code Examples
                                </h3>
                                {showExamples ? (
                                    <ChevronDownIcon className='h-5 w-5 text-gray-500' />
                                ) : (
                                    <ChevronRightIcon className='h-5 w-5 text-gray-500' />
                                )}
                            </button>
                            {showExamples && (
                                <div className='px-4 pb-4'>
                                    <CodeExamples
                                        onSelectExample={handleSelectExample}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Instructions Accordion */}
                        <div
                            className={`${
                                isDark
                                    ? 'bg-gray-800 border-gray-600'
                                    : 'bg-white border-gray-200'
                            } rounded-lg shadow-sm border`}>
                            <button
                                onClick={() =>
                                    setShowInstructions(!showInstructions)
                                }
                                className={`w-full p-4 flex items-center justify-between ${
                                    isDark
                                        ? 'hover:bg-gray-700'
                                        : 'hover:bg-gray-50'
                                } transition-colors`}>
                                <h3
                                    className={`text-lg font-semibold ${textColor} flex items-center`}>
                                    <ChatBubbleLeftRightIcon className='h-5 w-5 mr-2' />
                                    How to use:
                                </h3>
                                {showInstructions ? (
                                    <ChevronDownIcon className='h-5 w-5 text-gray-500' />
                                ) : (
                                    <ChevronRightIcon className='h-5 w-5 text-gray-500' />
                                )}
                            </button>
                            {showInstructions && (
                                <div className='px-4 pb-4'>
                                    <div className='space-y-6'>
                                        {/* Text Messages */}
                                        <div>
                                            <h4
                                                className={`font-medium mb-2 ${textSecondary} flex items-center`}>
                                                💬 Send text message:
                                            </h4>
                                            <p
                                                className={`text-sm ${textSecondary}`}>
                                                Simply type your message and
                                                send it for regular chat.
                                            </p>
                                        </div>

                                        {/* Code Editor Mode */}
                                        <div>
                                            <h4
                                                className={`font-medium mb-2 ${textSecondary} flex items-center`}>
                                                🔧 Code Editor Mode:
                                            </h4>
                                            <p
                                                className={`text-sm ${textSecondary} mb-3`}>
                                                Click &quot;Code Editor&quot; to
                                                switch to advanced coding mode
                                                with:
                                            </p>
                                            <ul
                                                className={`text-sm ${textSecondary} space-y-1 ml-4`}>
                                                <li>
                                                    • Language selection
                                                    (JavaScript, HTML, Python,
                                                    Java, etc.)
                                                </li>
                                                <li>
                                                    • Code sections (HTML + CSS
                                                    + JavaScript)
                                                </li>
                                                <li>
                                                    • Built-in examples for each
                                                    language
                                                </li>
                                                <li>
                                                    • Syntax highlighting and
                                                    validation
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Code Input Methods */}
                                        <div>
                                            <h4
                                                className={`font-medium mb-2 ${textSecondary} flex items-center`}>
                                                📝 Code Input Methods:
                                            </h4>
                                            <div
                                                className={`text-xs ${
                                                    isDark
                                                        ? 'bg-gray-700 text-gray-200'
                                                        : 'bg-gray-100 text-gray-800'
                                                } p-4 rounded space-y-3`}>
                                                {/* Method 1: Standalone */}
                                                <div>
                                                    <strong className='text-blue-400'>
                                                        1. Standalone Code:
                                                    </strong>
                                                    <div className='mt-2 space-y-1'>
                                                        <div>
                                                            <span className='text-green-400'>
                                                                HTML:
                                                            </span>
                                                            <pre className='mt-1'>{`<h1>Hello World!</h1>`}</pre>
                                                        </div>
                                                        <div>
                                                            <span className='text-green-400'>
                                                                CSS:
                                                            </span>
                                                            <pre className='mt-1'>{`body { color: blue; font-size: 18px; }`}</pre>
                                                        </div>
                                                        <div>
                                                            <span className='text-green-400'>
                                                                JavaScript:
                                                            </span>
                                                            <pre className='mt-1'>{`console.log("Hello!"); alert("Welcome!");`}</pre>
                                                        </div>
                                                        <div>
                                                            <span className='text-green-400'>
                                                                Python:
                                                            </span>
                                                            <pre className='mt-1'>{`print("Hello World!")`}</pre>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Method 2: Markdown */}
                                                <div>
                                                    <strong className='text-blue-400'>
                                                        2. Markdown Format:
                                                    </strong>
                                                    <pre className='mt-2'>{`\`\`\`html
<div class="container">
    <h1>Welcome</h1>
    <p>This is a paragraph</p>
</div>
\`\`\`

\`\`\`css
.container {
    text-align: center;
    padding: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}
\`\`\`

\`\`\`javascript
document.querySelector('.container').addEventListener('click', function() {
    this.style.transform = 'scale(1.1)';
});
\`\`\``}</pre>
                                                </div>

                                                {/* Method 3: Code Sections */}
                                                <div>
                                                    <strong className='text-blue-400'>
                                                        3. Code Sections Mode:
                                                    </strong>
                                                    <p className='mt-1 text-gray-400'>
                                                        Use the &quot;Code
                                                        Sections&quot;
                                                        button to write HTML,
                                                        CSS, and JavaScript in
                                                        separate areas.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <h4
                                                className={`font-medium mb-2 ${textSecondary} flex items-center`}>
                                                ✨ Features:
                                            </h4>
                                            <ul
                                                className={`text-sm ${textSecondary} space-y-1 ml-4`}>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        Live Preview:
                                                    </strong>{' '}
                                                    See your code run instantly
                                                </li>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        14 Languages:
                                                    </strong>{' '}
                                                    JavaScript, HTML, Python,
                                                    Java, C++, C#, PHP, Ruby,
                                                    Go, Rust, Swift, Kotlin,
                                                    TypeScript
                                                </li>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        Built-in Examples:
                                                    </strong>{' '}
                                                    Click &quot;Examples&quot;
                                                    for
                                                    ready-to-use code
                                                </li>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        Syntax Validation:
                                                    </strong>{' '}
                                                    Get real-time CSS error
                                                    checking
                                                </li>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        Dark/Light Theme:
                                                    </strong>{' '}
                                                    Toggle between themes
                                                </li>
                                                <li>
                                                    •{' '}
                                                    <strong>
                                                        Responsive Design:
                                                    </strong>{' '}
                                                    Works on all devices
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Quick Tips */}
                                        <div>
                                            <h4
                                                className={`font-medium mb-2 ${textSecondary} flex items-center`}>
                                                💡 Quick Tips:
                                            </h4>
                                            <ul
                                                className={`text-sm ${textSecondary} space-y-1 ml-4`}>
                                                <li>
                                                    • Use{' '}
                                                    <code className='bg-gray-200 dark:bg-gray-600 px-1 rounded'>
                                                        Shift+Enter
                                                    </code>{' '}
                                                    to send code in editor mode
                                                </li>
                                                <li>
                                                    • Click examples to
                                                    automatically insert them
                                                </li>
                                                <li>
                                                    • CSS validation helps catch
                                                    syntax errors
                                                </li>
                                                <li>
                                                    • Code sections are perfect
                                                    for web development
                                                </li>
                                                <li>
                                                    • Single input mode is great
                                                    for quick code snippets
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
