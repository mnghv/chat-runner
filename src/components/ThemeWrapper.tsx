'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

interface ThemeWrapperProps {
    children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
    return (
        <ThemeProvider>
            <ThemeToggle />
            {children}
        </ThemeProvider>
    );
}
