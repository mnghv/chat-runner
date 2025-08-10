# Chat Runner 🚀

**Live Code Sandbox in Chat** - چت کنید و کد HTML/CSS/JavaScript خود را به صورت زنده اجرا کنید!

## 📋 معرفی پروژه

Chat Runner یک اپلیکیشن چت تعاملی است که به کاربران امکان ارسال و اجرای کد HTML/CSS/JavaScript را در محیطی امن و زنده می‌دهد. این پروژه با استفاده از Next.js، HeroUI و Socket.IO ساخته شده است.

### ✨ ویژگی‌های کلیدی

- 💬 **چت Real-time**: ارسال و دریافت پیام‌ها به صورت زنده
- 🔧 **اجرای کد زنده**: اجرای امن کد HTML/CSS/JS در iframe
- 🎨 **UI مدرن**: طراحی زیبا با HeroUI و Tailwind CSS
- 🔒 **امنیت بالا**: اجرای کد در محیط sandbox شده
- 📱 **Responsive**: سازگار با تمام دستگاه‌ها
- 🌐 **پشتیبانی RTL**: پشتیبانی کامل از زبان فارسی

## 🛠️ استک تکنولوژی

- **Frontend**: Next.js 15 + React 19
- **UI Framework**: HeroUI + Tailwind CSS
- **Icons**: Heroicons
- **Real-time**: Socket.IO
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه**
```bash
git clone https://github.com/yourusername/chat-runner.git
cd chat-runner
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **اجرای پروژه در حالت توسعه**
```bash
npm run dev
```

4. **باز کردن مرورگر**
```
http://localhost:3000
```

### اسکریپت‌های موجود

```bash
npm run dev      # اجرا در حالت توسعه
npm run build    # ساخت نسخه production
npm run start    # اجرای نسخه production
npm run lint     # بررسی کد
```

## 📖 نحوه استفاده

### ارسال پیام متنی
به راحتی پیام خود را در فیلد ورودی تایپ کرده و ارسال کنید.

### ارسال کد HTML/CSS/JavaScript
کد خود را با فرمت markdown ارسال کنید:

```markdown
```html
<div class="container">
  <h1>سلام دنیا!</h1>
  <p>این یک نمونه کد است.</p>
</div>
```

```css
.container {
  text-align: center;
  padding: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
```

```javascript
document.querySelector('h1').addEventListener('click', function() {
  this.style.transform = 'scale(1.1)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});
```
```

### ویژگی‌های کد
- **نمایش کد**: کلیک روی "نمایش کد" برای دیدن کد کامل
- **پیش‌نمایش**: کلیک روی "پیش‌نمایش" برای اجرای زنده کد
- **امنیت**: کد در محیط sandbox شده اجرا می‌شود

## 🏗️ ساختار پروژه

```
chat-runner/
├── src/
│   ├── app/
│   │   ├── globals.css          # استایل‌های全局
│   │   ├── layout.tsx           # Layout اصلی
│   │   └── page.tsx             # صفحه اصلی
│   ├── components/
│   │   ├── ChatBox.tsx          # کامپوننت چت اصلی
│   │   ├── MessageBubble.tsx    # نمایش پیام‌ها
│   │   └── CodeRunner.tsx       # اجرای کد در iframe
│   ├── types/
│   │   └── chat.ts              # تایپ‌های TypeScript
│   └── utils/
│       └── codeParser.ts        # پردازش کد
├── public/                      # فایل‌های استاتیک
├── package.json
└── README.md
```

## 🔧 کامپوننت‌های اصلی

### ChatBox
کامپوننت اصلی چت که شامل:
- نمایش لیست پیام‌ها
- فرم ارسال پیام
- اسکرول خودکار
- نمایش وضعیت loading

### MessageBubble
نمایش هر پیام با قابلیت‌های:
- تشخیص نوع پیام (متنی/کد)
- نمایش کد با syntax highlighting
- دکمه‌های نمایش/مخفی کردن کد
- دکمه پیش‌نمایش

### CodeRunner
اجرای امن کد در iframe:
- محیط sandbox شده
- تزریق HTML/CSS/JS
- جلوگیری از دسترسی‌های خطرناک

## 🎨 طراحی و UI

### رنگ‌بندی
- **Primary**: آبی (#3B82F6)
- **Secondary**: خاکستری (#6B7280)
- **Background**: گرادیان آبی روشن
- **Text**: خاکستری تیره (#1F2937)

### فونت
- **فونت فارسی**: Vazirmatn
- **فونت انگلیسی**: System fonts

### Responsive Design
- **Desktop**: حداکثر عرض 4xl
- **Tablet**: گرید 2 ستونه
- **Mobile**: تک ستونه

## 🔒 امنیت

### Sandbox Environment
- اجرای کد در iframe با `sandbox="allow-scripts allow-same-origin"`
- حذف دسترسی به `window.top`, `window.parent`, `window.opener`
- محدودیت دسترسی به DOM اصلی

### Input Validation
- بررسی فرمت کد قبل از اجرا
- محدودیت اندازه کد
- فیلتر کردن کدهای خطرناک

## 🚀 Deployment

### Vercel (پیشنهادی)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

## 🤝 مشارکت

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 👨‍💻 توسعه‌دهنده

**نام**: [نام شما]
**ایمیل**: [ایمیل شما]
**GitHub**: [لینک GitHub]

---

⭐ اگر این پروژه برایتان مفید بود، لطفاً ستاره بدهید!

---

**Tags:** #chat #realtime #nextjs #socketio #heroui #livecode #sandbox #html #css #javascript #iframe

**Chat Runner** is a real-time chat application that allows users to send messages and instantly run HTML/CSS/JS code inside a secure sandbox, built with Next.js, Socket.IO, HeroUI, and Solar Icons.
