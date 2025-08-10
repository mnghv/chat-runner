import { CodeBlock } from '@/types/chat';

// Memoized regex patterns for better performance
const REGEX_PATTERNS = {
    html: /```html\s*([\s\S]*?)\s*```/i,
    css: /```css\s*([\s\S]*?)\s*```/i,
    js: /```(?:js|javascript)\s*([\s\S]*?)\s*```/i,
    htmlTag: /<[^>]+>/,
    cssBlock: /[{][^}]*[}]/,
    jsKeywords: /(?:function|const|let|var|console\.|alert\(|document\.|window\.)/,
    htmlDoc: /<!DOCTYPE html>|<html[\s\S]*<\/html>/i,
} as const;

// Cache for parsed results
const parseCache = new Map<string, CodeBlock | null>();

export function parseCodeFromMessage(message: string): CodeBlock | null {
    // Check cache first
    if (parseCache.has(message)) {
        return parseCache.get(message)!;
    }

    const trimmedMessage = message.trim();
    
    // Check for markdown code blocks first
    const htmlMatch = trimmedMessage.match(REGEX_PATTERNS.html);
    const cssMatch = trimmedMessage.match(REGEX_PATTERNS.css);
    const jsMatch = trimmedMessage.match(REGEX_PATTERNS.js);

    // If we have markdown code blocks, use them
    if (htmlMatch) {
        const result = {
            html: htmlMatch[1].trim(),
            css: cssMatch ? cssMatch[1].trim() : '',
            javascript: jsMatch ? jsMatch[1].trim() : '',
        };
        parseCache.set(message, result);
        return result;
    }

    // Check for standalone HTML tags or code
    const hasHtmlTags = REGEX_PATTERNS.htmlTag.test(trimmedMessage);
    const hasCss = REGEX_PATTERNS.cssBlock.test(trimmedMessage);
    const hasJs = REGEX_PATTERNS.jsKeywords.test(trimmedMessage);
    const isHtmlDoc = REGEX_PATTERNS.htmlDoc.test(trimmedMessage);

    let result: CodeBlock | null = null;

    // If it looks like HTML, treat it as HTML code
    if (hasHtmlTags || isHtmlDoc) {
        result = {
            html: trimmedMessage,
            css: '',
            javascript: '',
        };
    }
    // If it looks like CSS, treat it as CSS code
    else if (hasCss && !hasHtmlTags && !hasJs) {
        result = {
            html: '<div>CSS Preview</div>',
            css: trimmedMessage,
            javascript: '',
        };
    }
    // If it looks like JavaScript, treat it as JS code
    else if (hasJs && !hasHtmlTags) {
        result = {
            html: '<div id="output">JavaScript Output:</div>',
            css: '',
            javascript: trimmedMessage,
        };
    }

    // Cache the result
    parseCache.set(message, result);
    return result;
}

export function isCodeMessage(message: string): boolean {
    const trimmedMessage = message.trim();

    // Check for markdown code blocks
    if (parseCodeFromMessage(message) !== null) {
        return true;
    }

    // Check for standalone HTML tags
    if (REGEX_PATTERNS.htmlTag.test(trimmedMessage)) {
        return true;
    }

    // Check for CSS
    if (REGEX_PATTERNS.cssBlock.test(trimmedMessage)) {
        return true;
    }

    // Check for JavaScript keywords
    if (REGEX_PATTERNS.jsKeywords.test(trimmedMessage)) {
        return true;
    }

    // Check for complete HTML document
    if (REGEX_PATTERNS.htmlDoc.test(trimmedMessage)) {
        return true;
    }

    return false;
}

// Optimized ID generation with better entropy
export function generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
}

// Clear cache function for memory management
export function clearParseCache(): void {
    parseCache.clear();
}

// Get cache size for debugging
export function getCacheSize(): number {
    return parseCache.size;
}
