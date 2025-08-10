'use client';

import React, { useState } from 'react';
import {
    CodeBracketIcon,
    ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeExample {
    title: string;
    description: string;
    code: string;
}

const examples: CodeExample[] = [
    {
        title: 'Animated Button',
        description: 'A beautiful button with hover animation',
        code: `\`\`\`html
<button class="animated-button">
  Click me!
</button>
\`\`\`

\`\`\`css
.animated-button {
  padding: 12px 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.animated-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
\`\`\`

\`\`\`javascript
document.querySelector('.animated-button').addEventListener('click', function() {
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'translateY(-2px)';
  }, 150);
});
\`\`\``,
    },
    {
        title: 'Product Card',
        description: 'Modern product card design',
        code: `\`\`\`html
<div class="product-card">
  <div class="product-image">
    <div class="image-placeholder">📱</div>
  </div>
  <div class="product-info">
    <h3>Smartphone</h3>
    <p>New smartphone with advanced features</p>
    <div class="price">$999.99</div>
    <button class="buy-button">Add to Cart</button>
  </div>
</div>
\`\`\`

\`\`\`css
.product-card {
  width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 4rem;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.2rem;
}

.product-info p {
  color: #666;
  margin: 0 0 16px 0;
  font-size: 0.9rem;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 16px;
}

.buy-button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.buy-button:hover {
  background: #5a67d8;
}
\`\`\`

\`\`\`javascript
document.querySelector('.buy-button').addEventListener('click', function() {
  this.textContent = 'Added! ✓';
  this.style.background = '#10b981';
  
  setTimeout(() => {
    this.textContent = 'Add to Cart';
    this.style.background = '#667eea';
  }, 2000);
});
\`\`\``,
    },
    {
        title: 'Countdown Timer',
        description: 'Beautiful countdown timer with animation',
        code: `\`\`\`html
<div class="timer-container">
  <div class="timer-display">
    <span id="minutes">05</span>:<span id="seconds">00</span>
  </div>
  <div class="timer-controls">
    <button id="start-btn">Start</button>
    <button id="reset-btn">Reset</button>
  </div>
</div>
\`\`\`

\`\`\`css
.timer-container {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  color: white;
}

.timer-display {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.timer-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.timer-controls button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

#start-btn {
  background: #10b981;
  color: white;
}

#reset-btn {
  background: #ef4444;
  color: white;
}

.timer-controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
\`\`\`

\`\`\`javascript
let timeLeft = 300; // 5 minutes
let timerId = null;
let isRunning = false;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('start-btn').textContent = 'Stop';
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerId);
        alert('Time is up!');
        resetTimer();
      }
    }, 1000);
  } else {
    clearInterval(timerId);
    isRunning = false;
    document.getElementById('start-btn').textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(timerId);
  timeLeft = 300;
  isRunning = false;
  updateDisplay();
  document.getElementById('start-btn').textContent = 'Start';
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
\`\`\``,
    },
];

interface CodeExamplesProps {
    onSelectExample: (code: string) => void;
}

export default function CodeExamples({ onSelectExample }: CodeExamplesProps) {
    const [selectedExample, setSelectedExample] = useState<number | null>(null);
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const borderColor = isDark ? 'border-gray-600' : 'border-gray-200';
    const hoverBorderColor = isDark
        ? 'hover:border-gray-500'
        : 'hover:border-gray-300';
    const selectedBgColor = isDark ? 'bg-blue-900/20' : 'bg-blue-50';
    const textColor = isDark ? 'text-white' : 'text-gray-800';
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
    const iconColor = isDark ? 'text-blue-400' : 'text-blue-600';
    const copyIconColor = isDark
        ? 'text-gray-400 hover:text-blue-400'
        : 'text-gray-500 hover:text-blue-600';

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // You can show a toast notification here
    };

    return (
        <div
            className={`${bgColor} rounded-lg p-6 shadow-sm border ${borderColor}`}>
            <div className='flex items-center mb-4'>
                <CodeBracketIcon className={`h-6 w-6 ${iconColor} mr-2`} />
                <h3 className={`text-lg font-semibold ${textColor}`}>
                    Ready-to-use Code Examples
                </h3>
            </div>

            <div className='space-y-4'>
                {examples.map((example, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedExample === index
                                ? `border-blue-500 ${selectedBgColor}`
                                : `${borderColor} ${hoverBorderColor}`
                        }`}
                        onClick={() =>
                            setSelectedExample(
                                selectedExample === index ? null : index
                            )
                        }>
                        <div className='flex items-center justify-between mb-2'>
                            <h4 className={`font-medium ${textColor}`}>
                                {example.title}
                            </h4>
                            <div className='flex space-x-2'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopyCode(example.code);
                                    }}
                                    className={`p-1 transition-colors ${copyIconColor}`}
                                    title='Copy code'>
                                    <ClipboardDocumentIcon className='h-4 w-4' />
                                </button>
                            </div>
                        </div>

                        <p className={`text-sm ${textSecondary} mb-3`}>
                            {example.description}
                        </p>

                        {selectedExample === index && (
                            <div className='mt-3'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectExample(example.code);
                                    }}
                                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'>
                                    Use this example
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
