import { Message } from '@/types/chat';

export const sampleMessages: Message[] = [
    {
        id: '1',
        text: 'سلام! خوش آمدید به Chat Runner',
        sender: 'system',
        type: 'text',
        timestamp: new Date(Date.now() - 60000),
    },
    {
        id: '2',
        text: 'سلام! چطور می‌تونم کد HTML ارسال کنم؟',
        sender: 'user',
        type: 'text',
        timestamp: new Date(Date.now() - 45000),
    },
    {
        id: '3',
        text: 'برای ارسال کد، از فرمت markdown استفاده کنید. مثال:\n\n```html\n<div>Hello World!</div>\n```',
        sender: 'system',
        type: 'text',
        timestamp: new Date(Date.now() - 30000),
    },
    {
        id: '4',
        text: `\`\`\`html
<div class="welcome-card">
  <h1>سلام دنیا!</h1>
  <p>این یک نمونه کد HTML است.</p>
</div>
\`\`\`

\`\`\`css
.welcome-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.welcome-card h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome-card p {
  font-size: 1.2rem;
  opacity: 0.9;
}
\`\`\`

\`\`\`javascript
document.querySelector('.welcome-card').addEventListener('click', function() {
  this.style.transform = 'scale(1.05)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});
\`\`\``,
        sender: 'user',
        type: 'code',
        code: {
            html: `<div class="welcome-card">
  <h1>سلام دنیا!</h1>
  <p>این یک نمونه کد HTML است.</p>
</div>`,
            css: `.welcome-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.welcome-card h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome-card p {
  font-size: 1.2rem;
  opacity: 0.9;
}`,
            javascript: `document.querySelector('.welcome-card').addEventListener('click', function() {
  this.style.transform = 'scale(1.05)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});`,
        },
        timestamp: new Date(Date.now() - 15000),
    },
    {
        id: '5',
        text: 'عالی! کد شما با موفقیت اجرا شد. می‌توانید روی کارت کلیک کنید تا انیمیشن را ببینید.',
        sender: 'system',
        type: 'text',
        timestamp: new Date(),
    },
];

export const sampleCodeExamples = [
    {
        title: 'دکمه انیمیشن',
        description: 'یک دکمه زیبا با انیمیشن hover',
        tags: ['button', 'animation', 'css'],
    },
    {
        title: 'کارت محصول',
        description: 'کارت محصول با طراحی مدرن',
        tags: ['card', 'product', 'design'],
    },
    {
        title: 'تایمر شمارش معکوس',
        description: 'تایمر زیبا با انیمیشن',
        tags: ['timer', 'countdown', 'javascript'],
    },
];
