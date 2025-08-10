'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    PaperAirplaneIcon,
    CodeBracketIcon,
    ChatBubbleLeftIcon,
    ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatBoxProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
}

// Language examples
const languageExamples = {
    javascript: {
        title: 'JavaScript Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'console.log("Hello, World!");',
                description: 'Basic console output',
            },
            {
                name: 'Function',
                code: `function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("User"));`,
                description: 'Simple function definition',
            },
            {
                name: 'Array Methods',
                code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
                description: 'Array manipulation',
            },
            {
                name: 'DOM Manipulation',
                code: `document.getElementById("output").innerHTML = "Hello from JS!";
document.body.style.backgroundColor = "lightblue";`,
                description: 'DOM interaction',
            },
            {
                name: 'Complete Web App',
                code: `\`\`\`html
<div id="app">
    <h1>Counter App</h1>
    <p>Count: <span id="count">0</span></p>
    <button id="increment">Increment</button>
    <button id="decrement">Decrement</button>
</div>
\`\`\`

\`\`\`css
#app {
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}

button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#increment {
    background-color: #4CAF50;
    color: white;
}

#decrement {
    background-color: #f44336;
    color: white;
}
\`\`\`

\`\`\`javascript
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

incrementBtn.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
});

decrementBtn.addEventListener('click', () => {
    count--;
    countElement.textContent = count;
});
\`\`\``,
                description: 'Complete web application',
            },
        ],
    },
    html: {
        title: 'HTML Examples',
        examples: [
            {
                name: 'Basic Structure',
                code: `<div>
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
</div>`,
                description: 'Simple HTML structure',
            },
            {
                name: 'Form',
                code: `<form>
    <input type="text" placeholder="Enter your name">
    <button type="submit">Submit</button>
</form>`,
                description: 'HTML form elements',
            },
            {
                name: 'List',
                code: `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>`,
                description: 'Unordered list',
            },
            {
                name: 'Table',
                code: `<table border="1">
    <tr><th>Name</th><th>Age</th></tr>
    <tr><td>John</td><td>25</td></tr>
    <tr><td>Jane</td><td>30</td></tr>
</table>`,
                description: 'HTML table',
            },
            {
                name: 'Complete Page',
                code: `\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Site</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home</h2>
            <p>Welcome to our website!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>
\`\`\`

\`\`\`css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
}

header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    padding: 5px 10px;
}

nav a:hover {
    background-color: #555;
    border-radius: 3px;
}

main {
    padding: 2rem;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
}
\`\`\`

\`\`\`javascript
// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
\`\`\``,
                description: 'Complete HTML page with styling',
            },
        ],
    },
    css: {
        title: 'CSS Examples',
        examples: [
            {
                name: 'Basic Styling',
                code: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 20px;
}`,
                description: 'Basic page styling',
            },
            {
                name: 'Flexbox',
                code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: linear-gradient(45deg, #667eea, #764ba2);
}`,
                description: 'Flexbox layout',
            },
            {
                name: 'Animation',
                code: `.animated {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`,
                description: 'CSS animation',
            },
            {
                name: 'Responsive Design',
                code: `.responsive {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
}`,
                description: 'Responsive layout',
            },
        ],
    },
    python: {
        title: 'Python Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'print("Hello, World!")',
                description: 'Basic output',
            },
            {
                name: 'Function',
                code: `def greet(name):
    return f"Hello, {name}!"

print(greet("User"))`,
                description: 'Function definition',
            },
            {
                name: 'List Comprehension',
                code: `numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
print(squares)`,
                description: 'List comprehension',
            },
            {
                name: 'Class',
                code: `class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, I'm {self.name}"

person = Person("John")
print(person.greet())`,
                description: 'Class definition',
            },
            {
                name: 'Simple Python Code',
                code: `# Simple Python example
name = input("Enter your name: ")
age = int(input("Enter your age: "))

if age >= 18:
    print(f"Hello {name}, you are an adult!")
else:
    years_left = 18 - age
    print(f"Hello {name}, you will be an adult in {years_left} years!")`,
                description: 'Interactive Python program',
            },
            {
                name: 'Web App with Flask',
                code: `\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Python Web App</title>
</head>
<body>
    <h1>Python Calculator</h1>
    <form method="POST">
        <input type="number" name="num1" placeholder="First number">
        <select name="operation">
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
        </select>
        <input type="number" name="num2" placeholder="Second number">
        <button type="submit">Calculate</button>
    </form>
    {% if result %}
    <h2>Result: {{ result }}</h2>
    {% endif %}
</body>
</html>
\`\`\`

\`\`\`css
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

input, select, button {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

h2 {
    text-align: center;
    color: #28a745;
}
\`\`\`

\`\`\`javascript
// This would be handled by Python Flask backend
// JavaScript for client-side validation
document.querySelector('form').addEventListener('submit', function(e) {
    const num1 = document.querySelector('input[name="num1"]').value;
    const num2 = document.querySelector('input[name="num2"]').value;
    
    if (!num1 || !num2) {
        e.preventDefault();
        alert('Please enter both numbers!');
    }
});
\`\`\``,
                description: 'Python Flask web application',
            },
        ],
    },
    java: {
        title: 'Java Examples',
        examples: [
            {
                name: 'Hello World',
                code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
                description: 'Basic Java program',
            },
            {
                name: 'Method',
                code: `public static String greet(String name) {
    return "Hello, " + name + "!";
}

System.out.println(greet("User"));`,
                description: 'Method definition',
            },
            {
                name: 'Array',
                code: `int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}`,
                description: 'Array iteration',
            },
            {
                name: 'Class',
                code: `public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public String greet() {
        return "Hello, I'm " + name;
    }
}`,
                description: 'Class definition',
            },
            {
                name: 'Simple Java Program',
                code: `import java.util.Scanner;

public class SimpleProgram {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        if (age >= 18) {
            System.out.println("Hello " + name + ", you are an adult!");
        } else {
            int yearsLeft = 18 - age;
            System.out.println("Hello " + name + ", you will be an adult in " + yearsLeft + " years!");
        }
        
        scanner.close();
    }
}`,
                description: 'Interactive Java program',
            },
        ],
    },
    cpp: {
        title: 'C++ Examples',
        examples: [
            {
                name: 'Hello World',
                code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
                description: 'Basic C++ program',
            },
            {
                name: 'Function',
                code: `#include <iostream>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << greet("User") << endl;
    return 0;
}`,
                description: 'Function definition',
            },
            {
                name: 'Vector',
                code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    for (int num : numbers) {
        cout << num << endl;
    }
    return 0;
}`,
                description: 'Vector usage',
            },
            {
                name: 'Class',
                code: `#include <iostream>
using namespace std;

class Person {
private:
    string name;
public:
    Person(string n) : name(n) {}
    string greet() {
        return "Hello, I'm " + name;
    }
};`,
                description: 'Class definition',
            },
        ],
    },
    csharp: {
        title: 'C# Examples',
        examples: [
            {
                name: 'Hello World',
                code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
                description: 'Basic C# program',
            },
            {
                name: 'Method',
                code: `using System;

static string Greet(string name) {
    return $"Hello, {name}!";
}

Console.WriteLine(Greet("User"));`,
                description: 'Method definition',
            },
            {
                name: 'List',
                code: `using System;
using System.Collections.Generic;
using System.Linq;

var numbers = new List<int> { 1, 2, 3, 4, 5 };
var doubled = numbers.Select(n => n * 2);
foreach (var num in doubled) {
    Console.WriteLine(num);
}`,
                description: 'LINQ usage',
            },
            {
                name: 'Class',
                code: `using System;

public class Person {
    private string name;
    
    public Person(string name) {
        this.name = name;
    }
    
    public string Greet() {
        return $"Hello, I'm {name}";
    }
}`,
                description: 'Class definition',
            },
        ],
    },
    php: {
        title: 'PHP Examples',
        examples: [
            {
                name: 'Hello World',
                code: '<?php echo "Hello, World!"; ?>',
                description: 'Basic PHP output',
            },
            {
                name: 'Function',
                code: `<?php
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("User");
?>`,
                description: 'Function definition',
            },
            {
                name: 'Array',
                code: `<?php
$numbers = [1, 2, 3, 4, 5];
foreach ($numbers as $num) {
    echo $num . "\\n";
}
?>`,
                description: 'Array iteration',
            },
            {
                name: 'Class',
                code: `<?php
class Person {
    private $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function greet() {
        return "Hello, I'm " . $this->name;
    }
}
?>`,
                description: 'Class definition',
            },
        ],
    },
    ruby: {
        title: 'Ruby Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'puts "Hello, World!"',
                description: 'Basic output',
            },
            {
                name: 'Method',
                code: `def greet(name)
  "Hello, #{name}!"
end

puts greet("User")`,
                description: 'Method definition',
            },
            {
                name: 'Array',
                code: `numbers = [1, 2, 3, 4, 5]
numbers.each { |num| puts num }`,
                description: 'Array iteration',
            },
            {
                name: 'Class',
                code: `class Person
  def initialize(name)
    @name = name
  end
  
  def greet
    "Hello, I'm #{@name}"
  end
end`,
                description: 'Class definition',
            },
        ],
    },
    go: {
        title: 'Go Examples',
        examples: [
            {
                name: 'Hello World',
                code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
                description: 'Basic Go program',
            },
            {
                name: 'Function',
                code: `package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    fmt.Println(greet("User"))
}`,
                description: 'Function definition',
            },
            {
                name: 'Slice',
                code: `package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    for _, num := range numbers {
        fmt.Println(num)
    }
}`,
                description: 'Slice iteration',
            },
            {
                name: 'Struct',
                code: `package main

import "fmt"

type Person struct {
    Name string
}

func (p Person) Greet() string {
    return "Hello, I'm " + p.Name
}`,
                description: 'Struct definition',
            },
        ],
    },
    rust: {
        title: 'Rust Examples',
        examples: [
            {
                name: 'Hello World',
                code: `fn main() {
    println!("Hello, World!");
}`,
                description: 'Basic Rust program',
            },
            {
                name: 'Function',
                code: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("User"));
}`,
                description: 'Function definition',
            },
            {
                name: 'Vector',
                code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    for num in numbers {
        println!("{}", num);
    }
}`,
                description: 'Vector iteration',
            },
            {
                name: 'Struct',
                code: `struct Person {
    name: String,
}

impl Person {
    fn new(name: String) -> Self {
        Person { name }
    }
    
    fn greet(&self) -> String {
        format!("Hello, I'm {}", self.name)
    }
}`,
                description: 'Struct definition',
            },
        ],
    },
    swift: {
        title: 'Swift Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'print("Hello, World!")',
                description: 'Basic output',
            },
            {
                name: 'Function',
                code: `func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "User"))`,
                description: 'Function definition',
            },
            {
                name: 'Array',
                code: `let numbers = [1, 2, 3, 4, 5]
for number in numbers {
    print(number)
}`,
                description: 'Array iteration',
            },
            {
                name: 'Class',
                code: `class Person {
    let name: String
    
    init(name: String) {
        self.name = name
    }
    
    func greet() -> String {
        return "Hello, I'm \\(name)"
    }
}`,
                description: 'Class definition',
            },
        ],
    },
    kotlin: {
        title: 'Kotlin Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'println("Hello, World!")',
                description: 'Basic output',
            },
            {
                name: 'Function',
                code: `fun greet(name: String): String {
    return "Hello, $name!"
}

println(greet("User"))`,
                description: 'Function definition',
            },
            {
                name: 'List',
                code: `val numbers = listOf(1, 2, 3, 4, 5)
numbers.forEach { println(it) }`,
                description: 'List iteration',
            },
            {
                name: 'Class',
                code: `class Person(val name: String) {
    fun greet(): String {
        return "Hello, I'm $name"
    }
}`,
                description: 'Class definition',
            },
        ],
    },
    typescript: {
        title: 'TypeScript Examples',
        examples: [
            {
                name: 'Hello World',
                code: 'console.log("Hello, World!");',
                description: 'Basic output',
            },
            {
                name: 'Function',
                code: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("User"));`,
                description: 'Typed function',
            },
            {
                name: 'Interface',
                code: `interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: "John",
    age: 30
};

console.log(person);`,
                description: 'Interface definition',
            },
            {
                name: 'Class',
                code: `class Person {
    constructor(private name: string) {}
    
    greet(): string {
        return \`Hello, I'm \${this.name}\`;
    }
}

const person = new Person("John");
console.log(person.greet());`,
                description: 'Class definition',
            },
        ],
    },
};

export default function ChatBox({
    messages,
    onSendMessage,
    isLoading = false,
}: ChatBoxProps) {
    const [inputValue, setInputValue] = useState('');
    const [isEditorMode, setIsEditorMode] = useState(false);
    const [language, setLanguage] = useState('javascript');
    const [showExamples, setShowExamples] = useState(false);
    const [showCodeSections, setShowCodeSections] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const inputBgColor = isDark ? 'bg-gray-700' : 'bg-white';
    const inputBorderColor = isDark ? 'border-gray-600' : 'border-gray-300';
    const inputTextColor = isDark ? 'text-white' : 'text-gray-900';
    const placeholderColor = isDark
        ? 'placeholder-gray-400'
        : 'placeholder-gray-500';
    const textColor = isDark ? 'text-gray-400' : 'text-gray-500';
    const toggleBgColor = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const toggleActiveBgColor = isDark ? 'bg-blue-600' : 'bg-blue-500';
    const toggleTextColor = isDark ? 'text-gray-300' : 'text-gray-600';
    const toggleActiveTextColor = 'text-white';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        let messageToSend = '';

        if (showCodeSections) {
            // If using code sections, combine all sections
            const sections = [];

            if (['html', 'javascript'].includes(language)) {
                // For web languages, use separate sections
                if (htmlCode.trim())
                    sections.push(`\`\`\`html\n${htmlCode.trim()}\n\`\`\``);
                if (cssCode.trim())
                    sections.push(`\`\`\`css\n${cssCode.trim()}\n\`\`\``);
                if (jsCode.trim())
                    sections.push(`\`\`\`javascript\n${jsCode.trim()}\n\`\`\``);
            } else {
                // For other languages, use single section
                if (htmlCode.trim())
                    sections.push(
                        `\`\`\`${language}\n${htmlCode.trim()}\n\`\`\``
                    );
            }

            if (sections.length > 0) {
                messageToSend = sections.join('\n\n');
            }
        } else {
            // Single input mode
            messageToSend = inputValue.trim();
        }

        if (messageToSend && !isLoading) {
            onSendMessage(messageToSend);
            setInputValue('');
            setHtmlCode('');
            setCssCode('');
            setJsCode('');
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    const toggleEditorMode = () => {
        setIsEditorMode(!isEditorMode);
    };

    const toggleExamples = () => {
        setShowExamples(!showExamples);
    };

    const toggleCodeSections = () => {
        setShowCodeSections(!showCodeSections);
    };

    const insertExample = (code: string) => {
        if (showCodeSections) {
            if (['html', 'javascript'].includes(language)) {
                // Parse the example code and distribute to appropriate sections for web languages
                const htmlMatch = code.match(/```html\s*([\s\S]*?)\s*```/i);
                const cssMatch = code.match(/```css\s*([\s\S]*?)\s*```/i);
                const jsMatch = code.match(
                    /```(?:js|javascript)\s*([\s\S]*?)\s*```/i
                );

                if (htmlMatch) setHtmlCode(htmlMatch[1].trim());
                if (cssMatch) setCssCode(cssMatch[1].trim());
                if (jsMatch) setJsCode(jsMatch[1].trim());
            } else {
                // For other languages, check if it has markdown blocks or is plain code
                const languageMatch = code.match(
                    new RegExp(
                        `\`\`\`${language}\\s*([\\s\\S]*?)\\s*\`\`\``,
                        'i'
                    )
                );
                if (languageMatch) {
                    setHtmlCode(languageMatch[1].trim());
                } else {
                    // If no markdown blocks, treat as plain code
                    setHtmlCode(code);
                }
            }
        } else {
            setInputValue(code);
        }
        setShowExamples(false);
    };

    const getLanguageColor = (lang: string) => {
        const colors: { [key: string]: string } = {
            javascript: '#f7df1e',
            html: '#e34c26',
            css: '#1572b6',
            python: '#3776ab',
            java: '#ed8b00',
            cpp: '#00599c',
            csharp: '#178600',
            php: '#777bb4',
            ruby: '#cc342d',
            go: '#00add8',
            rust: '#ce422b',
            swift: '#ff6b4a',
            kotlin: '#f18e33',
            typescript: '#3178c6',
        };
        return colors[lang] || '#6b7280';
    };

    const currentExamples =
        languageExamples[language as keyof typeof languageExamples];

    const validateCSS = (cssCode: string) => {
        const errors = [];
        const lines = cssCode.split('\n');

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (
                trimmedLine &&
                !trimmedLine.startsWith('/*') &&
                !trimmedLine.startsWith('*/')
            ) {
                // Check for missing semicolon
                if (
                    trimmedLine.includes(':') &&
                    !trimmedLine.includes(';') &&
                    !trimmedLine.includes('{') &&
                    !trimmedLine.includes('}')
                ) {
                    errors.push(`Line ${index + 1}: Missing semicolon`);
                }
                // Check for invalid syntax like "property: { value }"
                if (
                    trimmedLine.includes(':') &&
                    trimmedLine.includes('{') &&
                    !trimmedLine.includes('}')
                ) {
                    errors.push(
                        `Line ${
                            index + 1
                        }: Invalid CSS syntax. Use "property: value;" not "property: { value }"`
                    );
                }
            }
        });

        return errors;
    };

    const getCSSValidationMessage = (cssCode: string) => {
        const errors = validateCSS(cssCode);
        if (errors.length > 0) {
            return (
                <div className='text-xs text-red-500 mt-1'>
                    <strong>CSS Errors:</strong>
                    <ul className='list-disc list-inside'>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`flex flex-col h-full ${bgColor} rounded-lg shadow-sm`}>
            {/* Messages Area */}
            <div
                className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${
                    isEditorMode && showCodeSections
                        ? 'max-h-[300px]'
                        : 'max-h-[500px]'
                }`}>
                {messages.length === 0 ? (
                    <div className={`text-center ${textColor} mt-8`}>
                        <div className='text-6xl mb-4'>💬</div>
                        <h3 className='text-lg font-medium'>Start chatting!</h3>
                        <p className='text-sm'>
                            Send messages or write HTML/CSS/JS code
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                    ))
                )}
                {isLoading && (
                    <div className={`flex items-center space-x-2 ${textColor}`}>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'></div>
                        <span className='text-sm'>Typing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
                className={`border-t ${
                    isDark
                        ? 'border-gray-600 bg-gray-800'
                        : 'border-gray-200 bg-white'
                } p-4 rounded-b-lg`}>
                {/* Editor Toggle */}
                <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center space-x-1'>
                        <button
                            type='button'
                            onClick={toggleEditorMode}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                isEditorMode
                                    ? `${toggleActiveBgColor} ${toggleActiveTextColor}`
                                    : `${toggleBgColor} ${toggleTextColor} hover:bg-gray-200 dark:hover:bg-gray-600`
                            }`}>
                            {isEditorMode ? (
                                <>
                                    <CodeBracketIcon className='h-4 w-4' />
                                    <span>Code Editor</span>
                                </>
                            ) : (
                                <>
                                    <ChatBubbleLeftIcon className='h-4 w-4' />
                                    <span>Chat Mode</span>
                                </>
                            )}
                        </button>
                    </div>

                    {isEditorMode && (
                        <div className='flex items-center space-x-2'>
                            <span className={`text-xs ${textColor}`}>
                                Language:
                            </span>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className={`text-xs px-2 py-1 rounded border ${inputBorderColor} ${inputBgColor} ${inputTextColor} focus:outline-none focus:ring-1 focus:ring-blue-500`}>
                                <option value='javascript'>JavaScript</option>
                                <option value='html'>HTML</option>
                                <option value='python'>Python</option>
                                <option value='java'>Java</option>
                                <option value='cpp'>C++</option>
                                <option value='csharp'>C#</option>
                                <option value='php'>PHP</option>
                                <option value='ruby'>Ruby</option>
                                <option value='go'>Go</option>
                                <option value='rust'>Rust</option>
                                <option value='swift'>Swift</option>
                                <option value='kotlin'>Kotlin</option>
                                <option value='typescript'>TypeScript</option>
                            </select>

                            {/* Code Sections Toggle */}
                            <button
                                type='button'
                                onClick={toggleCodeSections}
                                className={`text-xs px-2 py-1 rounded border ${inputBorderColor} ${inputBgColor} ${inputTextColor} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                                    showCodeSections
                                        ? 'bg-blue-500 text-white'
                                        : ''
                                }`}
                                title='Toggle code sections'>
                                {showCodeSections
                                    ? 'Single Input'
                                    : 'Code Sections'}
                            </button>

                            {/* Examples Toggle */}
                            <button
                                type='button'
                                onClick={toggleExamples}
                                className={`text-xs px-2 py-1 rounded border ${inputBorderColor} ${inputBgColor} ${inputTextColor} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                                title='Show examples'>
                                Examples
                            </button>
                        </div>
                    )}
                </div>

                {/* Language Examples */}
                {isEditorMode && showExamples && currentExamples && (
                    <div
                        className={`mb-3 p-3 rounded-lg border ${inputBorderColor} ${inputBgColor}`}>
                        <div className='flex items-center justify-between mb-2'>
                            <h4 className={`text-sm font-medium ${textColor}`}>
                                {currentExamples.title}
                            </h4>
                            <button
                                onClick={toggleExamples}
                                className={`text-xs ${textColor} hover:text-blue-400`}>
                                ✕
                            </button>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto'>
                            {currentExamples.examples.map((example, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded border ${inputBorderColor} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                                    onClick={() => insertExample(example.code)}>
                                    <div className='flex items-center justify-between mb-1'>
                                        <span
                                            className={`text-xs font-medium ${textColor}`}>
                                            {example.name}
                                        </span>
                                        <ClipboardDocumentIcon className='h-3 w-3 text-gray-400' />
                                    </div>
                                    <p
                                        className={`text-xs ${textColor} opacity-75`}>
                                        {example.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex space-x-2'>
                    {isEditorMode ? (
                        showCodeSections ? (
                            // Code Sections Mode
                            <div className='flex-1 space-y-3'>
                                {/* Show sections based on selected language */}
                                {['html', 'javascript'].includes(language) && (
                                    <>
                                        {/* HTML Section - Show for HTML, JavaScript, CSS languages */}
                                        <div
                                            className={`border ${inputBorderColor} rounded-lg overflow-hidden ${inputBgColor}`}>
                                            <div
                                                className={`px-3 py-2 border-b ${inputBorderColor} flex items-center justify-between`}>
                                                <div className='flex items-center space-x-2'>
                                                    <div
                                                        className='w-3 h-3 rounded-full'
                                                        style={{
                                                            backgroundColor:
                                                                '#e34c26',
                                                        }}></div>
                                                    <span
                                                        className={`text-xs font-medium ${textColor}`}>
                                                        HTML
                                                    </span>
                                                </div>
                                            </div>
                                            <textarea
                                                value={htmlCode}
                                                onChange={(e) =>
                                                    setHtmlCode(e.target.value)
                                                }
                                                placeholder='Write your HTML code here...'
                                                className={`w-full px-4 py-3 resize-none focus:outline-none ${inputBgColor} ${inputTextColor} ${placeholderColor} font-mono text-sm leading-relaxed`}
                                                style={{ minHeight: '80px' }}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        {/* CSS Section - Show for HTML, JavaScript, CSS languages */}
                                        <div
                                            className={`border ${inputBorderColor} rounded-lg overflow-hidden ${inputBgColor}`}>
                                            <div
                                                className={`px-3 py-2 border-b ${inputBorderColor} flex items-center justify-between`}>
                                                <div className='flex items-center space-x-2'>
                                                    <div
                                                        className='w-3 h-3 rounded-full'
                                                        style={{
                                                            backgroundColor:
                                                                '#1572b6',
                                                        }}></div>
                                                    <span
                                                        className={`text-xs font-medium ${textColor}`}>
                                                        CSS
                                                    </span>
                                                </div>
                                            </div>
                                            <textarea
                                                value={cssCode}
                                                onChange={(e) =>
                                                    setCssCode(e.target.value)
                                                }
                                                placeholder='Write your CSS code here... (Example: body { color: blue; })'
                                                className={`w-full px-4 py-3 resize-none focus:outline-none ${inputBgColor} ${inputTextColor} ${placeholderColor} font-mono text-sm leading-relaxed`}
                                                style={{ minHeight: '80px' }}
                                                disabled={isLoading}
                                            />
                                            {getCSSValidationMessage(cssCode)}
                                        </div>

                                        {/* JavaScript Section - Show for HTML, JavaScript, CSS languages */}
                                        <div
                                            className={`border ${inputBorderColor} rounded-lg overflow-hidden ${inputBgColor}`}>
                                            <div
                                                className={`px-3 py-2 border-b ${inputBorderColor} flex items-center justify-between`}>
                                                <div className='flex items-center space-x-2'>
                                                    <div
                                                        className='w-3 h-3 rounded-full'
                                                        style={{
                                                            backgroundColor:
                                                                '#f7df1e',
                                                        }}></div>
                                                    <span
                                                        className={`text-xs font-medium ${textColor}`}>
                                                        JavaScript
                                                    </span>
                                                </div>
                                            </div>
                                            <textarea
                                                value={jsCode}
                                                onChange={(e) =>
                                                    setJsCode(e.target.value)
                                                }
                                                placeholder='Write your JavaScript code here...'
                                                className={`w-full px-4 py-3 resize-none focus:outline-none ${inputBgColor} ${inputTextColor} ${placeholderColor} font-mono text-sm leading-relaxed`}
                                                style={{ minHeight: '80px' }}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Single Language Section - Show for other languages */}
                                {!['html', 'javascript'].includes(language) && (
                                    <div
                                        className={`border ${inputBorderColor} rounded-lg overflow-hidden ${inputBgColor}`}>
                                        <div
                                            className={`px-3 py-2 border-b ${inputBorderColor} flex items-center justify-between`}>
                                            <div className='flex items-center space-x-2'>
                                                <div
                                                    className='w-3 h-3 rounded-full'
                                                    style={{
                                                        backgroundColor:
                                                            getLanguageColor(
                                                                language
                                                            ),
                                                    }}></div>
                                                <span
                                                    className={`text-xs font-medium ${textColor}`}>
                                                    {language.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <textarea
                                            value={htmlCode}
                                            onChange={(e) =>
                                                setHtmlCode(e.target.value)
                                            }
                                            placeholder={`Write your ${language} code here...`}
                                            className={`w-full px-4 py-3 resize-none focus:outline-none ${inputBgColor} ${inputTextColor} ${placeholderColor} font-mono text-sm leading-relaxed`}
                                            style={{ minHeight: '120px' }}
                                            disabled={isLoading}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Single Input Mode
                            <div className='flex-1 relative'>
                                <div
                                    className={`border ${inputBorderColor} rounded-lg overflow-hidden ${inputBgColor}`}>
                                    {/* Editor Header */}
                                    <div
                                        className={`px-3 py-2 border-b ${inputBorderColor} flex items-center justify-between`}>
                                        <div className='flex items-center space-x-2'>
                                            <div
                                                className='w-3 h-3 rounded-full'
                                                style={{
                                                    backgroundColor:
                                                        getLanguageColor(
                                                            language
                                                        ),
                                                }}></div>
                                            <span
                                                className={`text-xs font-medium ${textColor}`}>
                                                {language.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className='text-xs text-gray-400'>
                                            Shift+Enter to send
                                        </div>
                                    </div>

                                    {/* Code Editor */}
                                    <textarea
                                        ref={textareaRef}
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder={`Write your ${language} code here...\n\nExample:\n${
                                            language === 'javascript'
                                                ? 'console.log("Hello World!");'
                                                : language === 'html'
                                                ? '<h1>Hello World!</h1>'
                                                : language === 'css'
                                                ? 'body { color: blue; }'
                                                : '// Your code here'
                                        }`}
                                        className={`w-full px-4 py-3 resize-none focus:outline-none ${inputBgColor} ${inputTextColor} ${placeholderColor} font-mono text-sm leading-relaxed`}
                                        style={{ minHeight: '120px' }}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        )
                    ) : (
                        <input
                            type='text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Type your message or send HTML/CSS/JS code...'
                            className={`flex-1 px-4 py-2 border ${inputBorderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgColor} ${inputTextColor} ${placeholderColor}`}
                            disabled={isLoading}
                        />
                    )}

                    <button
                        type='submit'
                        disabled={
                            isLoading ||
                            (showCodeSections
                                ? !(
                                      htmlCode.trim() ||
                                      cssCode.trim() ||
                                      jsCode.trim()
                                  )
                                : !inputValue.trim())
                        }
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                        <PaperAirplaneIcon className='h-5 w-5' />
                    </button>
                </form>
            </div>
        </div>
    );
}
