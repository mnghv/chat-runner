import { parseCodeFromMessage, isCodeMessage, generateId } from './codeParser';

describe('codeParser', () => {
    describe('isCodeMessage', () => {
        test('should return true for messages with HTML code blocks', () => {
            const message = '```html\n<div>test</div>\n```';
            expect(isCodeMessage(message)).toBe(true);
        });

        test('should return false for plain text messages', () => {
            const message = 'Hello world!';
            expect(isCodeMessage(message)).toBe(false);
        });

        test('should return false for messages with only CSS or JS blocks', () => {
            const message = '```css\nbody { color: red; }\n```';
            expect(isCodeMessage(message)).toBe(false);
        });
    });

    describe('parseCodeFromMessage', () => {
        test('should parse HTML, CSS, and JavaScript blocks', () => {
            const message = `\`\`\`html
<div class="test">Hello</div>
\`\`\`

\`\`\`css
.test { color: blue; }
\`\`\`

\`\`\`javascript
console.log('test');
\`\`\``;

            const result = parseCodeFromMessage(message);

            expect(result).toEqual({
                html: '<div class="test">Hello</div>',
                css: '.test { color: blue; }',
                javascript: "console.log('test');",
            });
        });

        test('should handle missing CSS and JavaScript blocks', () => {
            const message = '```html\n<div>test</div>\n```';
            const result = parseCodeFromMessage(message);

            expect(result).toEqual({
                html: '<div>test</div>',
                css: '',
                javascript: '',
            });
        });

        test('should return null for messages without HTML blocks', () => {
            const message = '```css\nbody { color: red; }\n```';
            const result = parseCodeFromMessage(message);

            expect(result).toBeNull();
        });

        test('should handle mixed content with code blocks', () => {
            const message = `Here's some text

\`\`\`html
<div>test</div>
\`\`\`

And more text

\`\`\`css
div { color: blue; }
\`\`\``;

            const result = parseCodeFromMessage(message);

            expect(result).toEqual({
                html: '<div>test</div>',
                css: 'div { color: blue; }',
                javascript: '',
            });
        });
    });

    describe('generateId', () => {
        test('should generate unique IDs', () => {
            const id1 = generateId();
            const id2 = generateId();

            expect(id1).toBeDefined();
            expect(id2).toBeDefined();
            expect(id1).not.toBe(id2);
        });

        test('should generate string IDs', () => {
            const id = generateId();
            expect(typeof id).toBe('string');
        });
    });
});
