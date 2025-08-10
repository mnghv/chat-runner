'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <button className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="h-5 w-5 text-gray-700" />
            </button>
        );
    }

    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const borderColor = isDark ? 'border-gray-600' : 'border-gray-200';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-700';

    return (
        <button
            onClick={toggleTheme}
            className={`fixed top-4 right-4 z-50 p-3 rounded-full ${bgColor} ${borderColor} shadow-lg hover:shadow-xl transition-all duration-200 border`}
            aria-label={`Switch to ${
                theme === 'light' ? 'dark' : 'light'
            } mode`}>
            {theme === 'light' ? (
                <MoonIcon className={`h-5 w-5 ${textColor}`} />
            ) : (
                <SunIcon className={`h-5 w-5 ${textColor}`} />
            )}
        </button>
    );
}
