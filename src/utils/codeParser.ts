import { CodeBlock } from '@/types/chat';

export function parseCodeFromMessage(message: string): CodeBlock | null {
    // Pattern to match HTML, CSS, and JS blocks in markdown format
    const htmlPattern = /```html\s*([\s\S]*?)\s*```/i;
    const cssPattern = /```css\s*([\s\S]*?)\s*```/i;
    const jsPattern = /```(?:js|javascript)\s*([\s\S]*?)\s*```/i;

    const htmlMatch = message.match(htmlPattern);
    const cssMatch = message.match(cssPattern);
    const jsMatch = message.match(jsPattern);

    // If we have markdown code blocks, use them
    if (htmlMatch) {
        const html = htmlMatch[1].trim();
        const css = cssMatch ? cssMatch[1].trim() : '';
        const javascript = jsMatch ? jsMatch[1].trim() : '';

        return {
            html,
            css,
            javascript,
        };
    }

    // Check for standalone HTML tags or code
    const trimmedMessage = message.trim();

    // Pattern to detect HTML tags
    const htmlTagPattern = /<[^>]+>/;
    const hasHtmlTags = htmlTagPattern.test(trimmedMessage);

    // Pattern to detect CSS
    const cssPattern2 = /[{][^}]*[}]/;
    const hasCss = cssPattern2.test(trimmedMessage);

    // Pattern to detect JavaScript
    const jsPattern2 =
        /(?:function|const|let|var|console\.|alert\(|document\.|window\.)/;
    const hasJs = jsPattern2.test(trimmedMessage);

    // If it looks like HTML, treat it as HTML code
    if (hasHtmlTags) {
        return {
            html: trimmedMessage,
            css: '',
            javascript: '',
        };
    }

    // If it looks like CSS, treat it as CSS code
    if (hasCss && !hasHtmlTags && !hasJs) {
        return {
            html: '<div>CSS Preview</div>',
            css: trimmedMessage,
            javascript: '',
        };
    }

    // If it looks like JavaScript, treat it as JS code
    if (hasJs && !hasHtmlTags) {
        return {
            html: '<div id="output">JavaScript Output:</div>',
            css: '',
            javascript: trimmedMessage,
        };
    }

    // Check if it's a complete HTML document
    if (
        trimmedMessage.includes('<!DOCTYPE html>') ||
        (trimmedMessage.includes('<html') && trimmedMessage.includes('</html>'))
    ) {
        return {
            html: trimmedMessage,
            css: '',
            javascript: '',
        };
    }

    return null;
}

export function isCodeMessage(message: string): boolean {
    const trimmedMessage = message.trim();

    // Check for markdown code blocks
    if (parseCodeFromMessage(message) !== null) {
        return true;
    }

    // Check for standalone HTML tags
    const htmlTagPattern = /<[^>]+>/;
    if (htmlTagPattern.test(trimmedMessage)) {
        return true;
    }

    // Check for CSS
    const cssPattern = /[{][^}]*[}]/;
    if (cssPattern.test(trimmedMessage)) {
        return true;
    }

    // Check for JavaScript keywords
    const jsPattern =
        /(?:function|const|let|var|console\.|alert\(|document\.|window\.)/;
    if (jsPattern.test(trimmedMessage)) {
        return true;
    }

    // Check for complete HTML document
    if (
        trimmedMessage.includes('<!DOCTYPE html>') ||
        (trimmedMessage.includes('<html') && trimmedMessage.includes('</html>'))
    ) {
        return true;
    }

    return false;
}

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
