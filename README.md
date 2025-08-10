# Chat Runner 🚀

**Live Code Sandbox in Chat** - Chat and run your HTML/CSS/JavaScript code live!

## 📋 Project Introduction

Chat Runner is an interactive chat application that allows users to send and execute HTML/CSS/JavaScript code in a secure and live environment. This project is built using Next.js, HeroUI, and Socket.IO.

### ✨ Key Features

- 💬 **Real-time Chat**: Send and receive messages in real-time
- 🔧 **Live Code Execution**: Secure execution of HTML/CSS/JS code in iframe
- 🎨 **Modern UI**: Beautiful design with HeroUI and Tailwind CSS
- 🔒 **High Security**: Code execution in sandboxed environment
- 📱 **Responsive**: Compatible with all devices
- 🌐 **RTL Support**: Full support for Persian language

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 + React 19
- **UI Framework**: HeroUI + Tailwind CSS
- **Icons**: Heroicons
- **Real-time**: Socket.IO
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the project**
```bash
git clone https://github.com/yourusername/chat-runner.git
cd chat-runner
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the project in development mode**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Run in development mode
npm run build    # Build production version
npm run start    # Run production version
npm run lint     # Code linting
```

## 📖 How to Use

### Sending Text Messages
Simply type your message in the input field and send it.

### Sending HTML/CSS/JavaScript Code
Send your code using markdown format:

```markdown
```html
<div class="container">
  <h1>Hello World!</h1>
  <p>This is a sample code.</p>
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

### Code Features
- **Show Code**: Click "Show Code" to see the complete code
- **Preview**: Click "Preview" to run the code live
- **Security**: Code runs in a sandboxed environment

## 🏗️ Project Structure

```bash
📁 chat-runner/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 🌐 globals.css          # Global styles & themes
│   │   ├── 🏗️ layout.tsx           # Root layout component
│   │   └── 🏠 page.tsx             # Home page component
│   ├── 📁 components/
│   │   ├── 💬 ChatBox.tsx          # Main chat interface
│   │   ├── 💭 MessageBubble.tsx    # Individual message display
│   │   ├── 🎨 CodeExamples.tsx     # Code example components
│   │   ├── ⚡ CodeRunner.tsx       # Live code execution
│   │   ├── 🌙 ThemeToggle.tsx      # Dark/light mode toggle
│   │   ├── 🎭 ThemeWrapper.tsx     # Theme context wrapper
│   │   └── 🔔 Toast.tsx            # Notification component
│   ├── 📁 config/
│   │   └── ⚙️ app.ts               # App configuration
│   ├── 📁 contexts/
│   │   └── 🌓 ThemeContext.tsx     # Theme management
│   ├── 📁 types/
│   │   └── 💬 chat.ts              # TypeScript interfaces
│   └── 📁 utils/
│       ├── 🔧 codeParser.ts        # Code parsing utilities
│       ├── 🧪 codeParser.test.ts   # Parser unit tests
│       └── 📊 testData.ts          # Test data & mocks
├── 📁 public/                     # Static assets
│   ├── 🎨 file.svg
│   ├── 🌍 globe.svg
│   ├── ⚡ next.svg
│   ├── 🚀 vercel.svg
│   └── 🪟 window.svg
├── 📁 docs/                       # Documentation
│   ├── 📖 API.md
│   ├── 🚀 DEPLOYMENT.md
│   ├── 🛠️ DEVELOPMENT.md
│   └── ✨ FEATURES.md
├── 📄 package.json               # Dependencies & scripts
├── 📄 tsconfig.json              # TypeScript config
├── 📄 tailwind.config.js         # Tailwind CSS config
├── 📄 next.config.ts             # Next.js config
├── 📄 jest.config.js             # Testing config
└── 📖 README.md                  # Project documentation
```

## 🔧 Main Components

### ChatBox
Main chat component that includes:
- Display message list
- Message sending form
- Auto-scroll
- Loading state display

### MessageBubble
Display each message with features:
- Message type detection (text/code)
- Code display with syntax highlighting
- Show/hide code buttons
- Preview button

### CodeRunner
Secure code execution in iframe:
- Sandboxed environment
- HTML/CSS/JS injection
- Prevention of dangerous access

## 🎨 Design and UI

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Background**: Light blue gradient
- **Text**: Dark gray (#1F2937)

### Fonts
- **Persian Font**: Vazirmatn
- **English Font**: System fonts

### Responsive Design
- **Desktop**: Maximum width 4xl
- **Tablet**: 2-column grid
- **Mobile**: Single column

## 🔒 Security

### Sandbox Environment
- Code execution in iframe with `sandbox="allow-scripts allow-same-origin"`
- Remove access to `window.top`, `window.parent`, `window.opener`
- Limit access to main DOM

### Input Validation
- Check code format before execution
- Code size limitations
- Filter dangerous code

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

## 🤝 Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

- **Name**: Mohaddese Naghavi
- **Email**: nghv.work@gmail.com
- **GitHub**: [github.com/mnghv](https://github.com/mnghv)

---

⭐ If this project was helpful to you, please give it a star!

---

**Tags:** #chat #realtime #nextjs #socketio #heroui #livecode #sandbox #html #css #javascript #iframe

**Chat Runner** is a real-time chat application that allows users to send messages and instantly run HTML/CSS/JS code inside a secure sandbox, built with Next.js, Socket.IO, HeroUI, and Solar Icons.
