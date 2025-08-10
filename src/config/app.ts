export const APP_CONFIG = {
    name: 'Chat Runner',
    description: 'Live Code Sandbox in Chat',
    version: '1.0.0',
    author: 'Your Name',

    // API Configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        timeout: 10000,
    },

    // Chat Configuration
    chat: {
        maxMessageLength: 5000,
        maxCodeLength: 10000,
        typingIndicatorDelay: 1000,
    },

    // Code Runner Configuration
    codeRunner: {
        iframeHeight: 256, // in pixels
        sandboxAttributes: 'allow-scripts allow-same-origin',
        maxExecutionTime: 5000, // in milliseconds
    },

    // UI Configuration
    ui: {
        theme: {
            primary: '#3B82F6',
            secondary: '#6B7280',
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
        },
        animation: {
            duration: 300,
            easing: 'ease-in-out',
        },
    },

    // Features
    features: {
        realTimeChat: true,
        codeExecution: true,
        codeExamples: true,
        toastNotifications: true,
    },
} as const;

export type AppConfig = typeof APP_CONFIG;
