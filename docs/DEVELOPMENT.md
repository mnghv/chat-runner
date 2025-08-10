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
│   │   └── page.tsx            # Home page (optimized)
│   ├── components/             # React components
│   │   ├── ChatBox.tsx         # Main chat component (optimized)
│   │   ├── MessageBubble.tsx   # Message display (optimized)
│   │   ├── CodeRunner.tsx      # Code execution
│   │   ├── CodeExamples.tsx    # Code examples
│   │   └── Toast.tsx           # Toast notifications
│   ├── types/                  # TypeScript types
│   │   └── chat.ts
│   ├── utils/                  # Utility functions
│   │   ├── codeParser.ts       # Code parsing (optimized)
│   │   └── testData.ts         # Test data
│   └── config/                 # Configuration
│       └── app.ts
├── docs/                       # Documentation
├── public/                     # Static files
└── package.json                # Optimized dependencies
```

## Development Workflow

### 1. Component Development

When creating new components, follow these performance best practices:

1. Create the component file in `src/components/`
2. Add TypeScript interfaces for props
3. Use Tailwind CSS for styling
4. Add proper error handling
5. Write JSDoc comments for complex functions
6. **Use React.memo for performance optimization**
7. **Use useMemo and useCallback for expensive operations**

Example:
```typescript
import React, { useMemo, useCallback } from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  theme: 'light' | 'dark';
}

/**
 * MyComponent - A reusable component with performance optimizations
 * @param props - Component props
 * @returns JSX element
 */
const MyComponent = React.memo(({ title, onAction, theme }: MyComponentProps) => {
  // Memoize expensive calculations
  const themeStyles = useMemo(() => ({
    bgColor: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    textColor: theme === 'dark' ? 'text-white' : 'text-gray-800',
  }), [theme]);

  // Memoize event handlers
  const handleAction = useCallback(() => {
    onAction?.();
  }, [onAction]);

  return (
    <div className={`${themeStyles.bgColor} rounded-lg p-4`}>
      <h2 className={`text-lg font-semibold ${themeStyles.textColor}`}>{title}</h2>
      {onAction && (
        <button 
          onClick={handleAction}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Action
        </button>
      )}
    </div>
  );
});

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

### 2. Performance Optimization Guidelines

#### React.memo Usage
- Use `React.memo` for components that receive stable props
- Add `displayName` for better debugging
- Only memoize components that actually benefit from it

#### useMemo Best Practices
- Memoize expensive calculations
- Memoize theme-dependent styles
- Memoize filtered/sorted arrays
- Use proper dependency arrays

#### useCallback Best Practices
- Memoize event handlers passed as props
- Memoize functions used in useEffect dependencies
- Avoid creating new functions in render

#### Example of Optimized Component:
```typescript
import React, { useState, useMemo, useCallback } from 'react';

interface OptimizedComponentProps {
  items: string[];
  onItemSelect: (item: string) => void;
  theme: 'light' | 'dark';
}

const OptimizedComponent = React.memo(({ items, onItemSelect, theme }: OptimizedComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Memoize theme styles
  const styles = useMemo(() => ({
    container: theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    input: theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
  }), [theme]);

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleItemClick = useCallback((item: string) => {
    onItemSelect(item);
  }, [onItemSelect]);

  return (
    <div className={`p-4 rounded-lg ${styles.container}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className={`w-full p-2 border rounded ${styles.input}`}
        placeholder="Search items..."
      />
      <div className="mt-4 space-y-2">
        {filteredItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
});

OptimizedComponent.displayName = 'OptimizedComponent';

export default OptimizedComponent;
```

### 3. State Management

Use React's built-in state management with performance optimizations:

```typescript
// Good: Using useCallback for state updates
const [items, setItems] = useState<string[]>([]);

const addItem = useCallback((newItem: string) => {
  setItems(prev => [...prev, newItem]);
}, []);

const removeItem = useCallback((index: number) => {
  setItems(prev => prev.filter((_, i) => i !== index));
}, []);

// Good: Using useMemo for derived state
const sortedItems = useMemo(() => {
  return [...items].sort();
}, [items]);

const itemCount = useMemo(() => {
  return items.length;
}, [items]);
```

### 4. Code Parser Development

When working with the code parser, follow these guidelines:

```typescript
// Use pre-compiled regex patterns
const REGEX_PATTERNS = {
  html: /```html\s*([\s\S]*?)\s*```/i,
  css: /```css\s*([\s\S]*?)\s*```/i,
  js: /```(?:js|javascript)\s*([\s\S]*?)\s*```/i,
} as const;

// Implement caching for expensive operations
const parseCache = new Map<string, CodeBlock | null>();

export function parseCodeFromMessage(message: string): CodeBlock | null {
  // Check cache first
  if (parseCache.has(message)) {
    return parseCache.get(message)!;
  }

  // Parse the message
  const result = parseMessage(message);
  
  // Cache the result
  parseCache.set(message, result);
  
  return result;
}
```

## Performance Best Practices

### 1. Bundle Optimization
- Remove unused dependencies
- Use dynamic imports for large components
- Optimize images and assets
- Enable compression

### 2. Rendering Optimization
- Use React.memo for expensive components
- Avoid inline objects and functions
- Use proper key props for lists
- Implement virtual scrolling for large lists

### 3. Memory Management
- Clean up event listeners
- Clear caches when appropriate
- Use WeakMap/WeakSet for object references
- Implement proper cleanup in useEffect

### 4. TypeScript Best Practices
- Use strict mode
- Avoid `any` types
- Define proper interfaces
- Use utility types when appropriate

## Testing

### Unit Tests
```bash
npm run test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Performance Monitoring

### Development Tools
- React DevTools Profiler
- Chrome DevTools Performance tab
- Bundle analyzer
- Lighthouse audits

### Performance Budgets
- Bundle size: < 300KB
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Deployment

### Build Optimization
```bash
# Analyze bundle size
ANALYZE=true npm run build

# Production build
npm run build
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

## Troubleshooting

### Common Performance Issues
1. **Unnecessary Re-renders**: Use React.memo and useCallback
2. **Large Bundle Size**: Remove unused dependencies
3. **Memory Leaks**: Clean up event listeners and caches
4. **Slow Parsing**: Implement caching for expensive operations

### Debugging Tips
- Use React DevTools Profiler
- Monitor bundle size with webpack-bundle-analyzer
- Check for memory leaks in Chrome DevTools
- Use TypeScript strict mode for better code quality

## Contributing

1. Follow the performance optimization guidelines
2. Write tests for new features
3. Update documentation
4. Use TypeScript for all new code
5. Follow the established code style

---

*This guide is maintained and updated as new optimizations are implemented.* 