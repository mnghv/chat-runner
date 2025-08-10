'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
    CodeBracketIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { Message } from '@/types/chat';
import CodeRunner from './CodeRunner';
import { useTheme } from '@/contexts/ThemeContext';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = React.memo(({ message }: MessageBubbleProps) => {
    const [showCode, setShowCode] = useState(false);
    const [showPreview, setShowPreview] = useState(true); // Default to showing preview
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const isCodeMessage = message.type === 'code';
    const isUserMessage = message.sender === 'user';

    // Memoize theme-dependent styles
    const themeStyles = useMemo(() => {
        const getBubbleClasses = () => {
            if (isUserMessage) {
                return 'bg-blue-500 text-white';
            } else {
                return isDark
                    ? 'bg-gray-800 text-white border-gray-600'
                    : 'bg-white text-gray-800 border-gray-200';
            }
        };

        const getTimestampClasses = () => {
            if (isUserMessage) {
                return 'text-blue-100';
            } else {
                return isDark ? 'text-gray-400' : 'text-gray-500';
            }
        };

        return {
            bubbleClasses: getBubbleClasses(),
            timestampClasses: getTimestampClasses(),
            borderColor: isDark ? 'border-gray-600' : 'border-gray-300',
            headerBg: isDark
                ? 'bg-gray-700 border-gray-600 text-gray-200'
                : 'bg-gray-100 border-gray-300 text-gray-800',
            codeBg: isDark ? 'bg-gray-950' : 'bg-gray-900',
            textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
        };
    }, [isDark, isUserMessage]);

    // Memoize toggle handlers
    const toggleCode = useCallback(() => {
        setShowCode((prev) => !prev);
    }, []);

    const togglePreview = useCallback(() => {
        setShowPreview((prev) => !prev);
    }, []);

    // Memoize timestamp
    const formattedTimestamp = useMemo(
        () => new Date(message.timestamp).toLocaleTimeString('en-US'),
        [message.timestamp]
    );

    return (
        <div
            className={`flex ${
                isUserMessage ? 'justify-end' : 'justify-start'
            }`}>
            <div
                className={`${
                    isCodeMessage
                        ? 'max-w-[99%] sm:max-w-[98%] lg:max-w-[96%]'
                        : 'max-w-[90%] sm:max-w-[80%]'
                } rounded-lg p-3 sm:p-4 border ${themeStyles.bubbleClasses}`}>
                {/* Message Header */}
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm font-medium'>
                        {isUserMessage ? 'You' : 'System'}
                    </span>
                    {isCodeMessage && (
                        <div className='flex items-center space-x-2'>
                            <CodeBracketIcon className='h-4 w-4' />
                            <button
                                onClick={toggleCode}
                                className='text-xs hover:underline flex items-center space-x-1'>
                                <span>
                                    {showCode ? 'Hide Code' : 'Show Code'}
                                </span>
                            </button>
                            <button
                                onClick={togglePreview}
                                className='text-xs hover:underline flex items-center space-x-1'>
                                {showPreview ? (
                                    <EyeSlashIcon className='h-3 w-3' />
                                ) : (
                                    <EyeIcon className='h-3 w-3' />
                                )}
                                <span>
                                    {showPreview
                                        ? 'Hide Preview'
                                        : 'Show Preview'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Message Content */}
                <div className='space-y-3'>
                    {/* Text Content */}
                    {isCodeMessage ? (
                        <div
                            className={`text-sm italic ${themeStyles.textSecondary}`}>
                            Code sent - check preview below
                        </div>
                    ) : (
                        <div className='whitespace-pre-wrap'>
                            {message.text}
                        </div>
                    )}

                    {/* Code Preview - Show first by default */}
                    {isCodeMessage && showPreview && message.code && (
                        <div
                            className={`border rounded-lg overflow-hidden ${themeStyles.borderColor}`}>
                            <div
                                className={`px-4 py-3 text-sm font-medium border-b ${themeStyles.headerBg}`}>
                                🎨 Code Preview
                            </div>
                            <div className='p-2'>
                                <CodeRunner
                                    html={message.code.html}
                                    css={message.code.css}
                                    javascript={message.code.javascript}
                                />
                            </div>
                        </div>
                    )}

                    {/* Code Content - Hidden by default */}
                    {isCodeMessage && showCode && (
                        <div
                            className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${themeStyles.codeBg} text-green-400`}>
                            <div className='mb-2 text-yellow-400'>HTML:</div>
                            <pre className='mb-4'>{message.code?.html}</pre>

                            <div className='mb-2 text-yellow-400'>CSS:</div>
                            <pre className='mb-4'>{message.code?.css}</pre>

                            <div className='mb-2 text-yellow-400'>
                                JavaScript:
                            </div>
                            <pre>{message.code?.javascript}</pre>
                        </div>
                    )}
                </div>

                {/* Timestamp */}
                <div className={`text-xs mt-2 ${themeStyles.timestampClasses}`}>
                    {formattedTimestamp}
                </div>
            </div>
        </div>
    );
});

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;
