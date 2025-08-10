import type { Metadata } from 'next';
import './globals.css';
import ThemeWrapper from '@/components/ThemeWrapper';

export const metadata: Metadata = {
    title: 'Chat Runner - Live Code Sandbox in Chat',
    description:
        'چت کنید و کد HTML/CSS/JavaScript خود را به صورت زنده اجرا کنید!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' dir='ltr'>
            <head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
                    rel='stylesheet'
                />
            </head>
            <body
                className='font-sans transition-colors duration-200'
                style={{
                    fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
                <ThemeWrapper>{children}</ThemeWrapper>
            </body>
        </html>
    );
}
