'use client';

import React, { useEffect } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({
    message,
    type = 'success',
    isVisible,
    onClose,
    duration = 3000,
}: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className='h-5 w-5 text-green-500' />;
            case 'error':
                return <XMarkIcon className='h-5 w-5 text-red-500' />;
            default:
                return <CheckCircleIcon className='h-5 w-5 text-blue-500' />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className='fixed top-4 left-4 z-50 animate-in slide-in-from-top-2'>
            <div
                className={`flex items-center p-4 rounded-lg border ${getBgColor()} shadow-lg`}>
                {getIcon()}
                <span className='mr-3 text-sm font-medium text-gray-900'>
                    {message}
                </span>
                <button
                    onClick={onClose}
                    className='mr-auto text-gray-400 hover:text-gray-600 transition-colors'>
                    <XMarkIcon className='h-4 w-4' />
                </button>
            </div>
        </div>
    );
}
