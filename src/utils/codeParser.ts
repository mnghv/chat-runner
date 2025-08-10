import { CodeBlock } from '@/types/chat';

export function parseCodeFromMessage(message: string): CodeBlock | null {
  // Pattern to match HTML, CSS, and JS blocks
  const htmlPattern = /```html\s*([\s\S]*?)\s*```/i;
  const cssPattern = /```css\s*([\s\S]*?)\s*```/i;
  const jsPattern = /```(?:js|javascript)\s*([\s\S]*?)\s*```/i;

  const htmlMatch = message.match(htmlPattern);
  const cssMatch = message.match(cssPattern);
  const jsMatch = message.match(jsPattern);

  // Check if we have at least HTML block
  if (!htmlMatch) {
    return null;
  }

  const html = htmlMatch[1].trim();
  const css = cssMatch ? cssMatch[1].trim() : '';
  const javascript = jsMatch ? jsMatch[1].trim() : '';

  return {
    html,
    css,
    javascript
  };
}

export function isCodeMessage(message: string): boolean {
  return parseCodeFromMessage(message) !== null;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
} 