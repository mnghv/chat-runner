'use client';

import React, { useRef, useEffect } from 'react';

interface CodeRunnerProps {
    html: string;
    css: string;
    javascript: string;
}

export default function CodeRunner({ html, css, javascript }: CodeRunnerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            const doc =
                iframe.contentDocument || iframe.contentWindow?.document;

            if (doc) {
                // Create the complete HTML document
                const fullHtml = `
          <!DOCTYPE html>
          <html lang="en" dir="ltr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Preview</title>
            <style>
              /* Reset and base styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                background: #fff;
                padding: 20px;
              }
              
              /* User's CSS */
              ${css}
            </style>
          </head>
          <body>
            ${html}
            
            <script>
              // Prevent access to parent window for security
              try {
                delete window.top;
                delete window.parent;
                delete window.opener;
              } catch (e) {
                // Ignore errors
              }
              
              // User's JavaScript
              ${javascript}
            </script>
          </body>
          </html>
        `;

                // Write the content to iframe
                doc.open();
                doc.write(fullHtml);
                doc.close();
            }
        }
    }, [html, css, javascript]);

    return (
        <div className='w-full'>
            <iframe
                ref={iframeRef}
                sandbox='allow-scripts allow-same-origin'
                className='w-full h-80 sm:h-96 md:h-[450px] border-0 bg-white rounded-lg shadow-sm'
                title='Code Preview'
                style={{ minHeight: '320px' }}
            />
        </div>
    );
}
