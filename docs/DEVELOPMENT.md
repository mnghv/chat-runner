# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/chat-runner.git
cd chat-runner
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chat-runner/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ChatBox.tsx         # Main chat component
│   │   ├── MessageBubble.tsx   # Message display
│   │   ├── CodeRunner.tsx      # Code execution
│   │   ├── CodeExamples.tsx    # Code examples
│   │   └── Toast.tsx           # Toast notifications
│   ├── types/                  # TypeScript types
│   │   └── chat.ts
│   ├── utils/                  # Utility functions
│   │   ├── codeParser.ts       # Code parsing
│   │   └── testData.ts         # Test data
│   └── config/                 # Configuration
│       └── app.ts
├── docs/                       # Documentation
├── public/                     # Static files
└── package.json
```

## Development Workflow

### 1. Component Development

When creating new components:

1. Create the component file in `src/components/`
2. Add TypeScript interfaces for props
3. Use Tailwind CSS for styling
4. Add proper error handling
5. Write JSDoc comments for complex functions

Example:
```typescript
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

/**
 * MyComponent - A reusable component
 * @param props - Component props
 * @returns JSX element
 */
export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {onAction && (
        <button 
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Action
        </button>
      )}
    </div>
  );
}
```

### 2. State Management

For simple state, use React hooks:

```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

For complex state, consider using:
- Zustand (lightweight)
- Redux Toolkit (complex apps)
- React Query (server state)

### 3. API Integration

Create API routes in `src/app/api/`:

```typescript
// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Handle GET request
  return NextResponse.json({ messages: [] });
}

export async function POST(request: NextRequest) {
  // Handle POST request
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### 4. Testing

Create test files with `.test.ts` or `.spec.ts` extension:

```typescript
// src/utils/codeParser.test.ts
import { parseCodeFromMessage, isCodeMessage } from './codeParser';

describe('codeParser', () => {
  test('should detect code message', () => {
    const message = '```html\n<div>test</div>\n```';
    expect(isCodeMessage(message)).toBe(true);
  });

  test('should parse code blocks', () => {
    const message = '```html\n<div>test</div>\n```';
    const result = parseCodeFromMessage(message);
    expect(result?.html).toBe('<div>test</div>');
  });
});
```

Run tests:
```bash
npm test
```

## Code Style

### TypeScript

- Use strict mode
- Define interfaces for all props
- Use type guards for runtime checks
- Prefer `interface` over `type` for objects

### React

- Use functional components with hooks
- Destructure props in function parameters
- Use proper dependency arrays in useEffect
- Handle loading and error states

### CSS/Tailwind

- Use Tailwind utility classes
- Create custom components for repeated patterns
- Use CSS variables for theme colors
- Follow mobile-first approach

## Performance

### Optimization Techniques

1. **Code Splitting**
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});
```

2. **Memoization**
```typescript
const MemoizedComponent = React.memo(MyComponent);
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

3. **Lazy Loading**
```typescript
const LazyImage = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt}
    loading="lazy"
  />
);
```

### Bundle Analysis

Analyze bundle size:
```bash
npm run build
npm run analyze
```

## Security

### Code Execution

1. **Sandbox Environment**
   - Use iframe with sandbox attributes
   - Remove dangerous window properties
   - Limit execution time

2. **Input Validation**
   - Validate all user inputs
   - Sanitize HTML content
   - Use Content Security Policy

3. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Monitor for abuse patterns

## Deployment

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

### Build Process

1. **Development**
```bash
npm run dev
```

2. **Production Build**
```bash
npm run build
npm start
```

3. **Static Export**
```bash
npm run export
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Check import paths
   - Verify type definitions
   - Run `npm run type-check`

2. **Build Errors**
   - Clear `.next` folder
   - Check for missing dependencies
   - Verify environment variables

3. **Runtime Errors**
   - Check browser console
   - Verify API endpoints
   - Check network requests

### Debug Tools

1. **React DevTools**
2. **Next.js Debug Mode**
```bash
DEBUG=* npm run dev
```

3. **TypeScript Debug**
```bash
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

### Commit Convention

Use conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com) 