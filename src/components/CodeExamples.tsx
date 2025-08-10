'use client';

import React, { useState } from 'react';
import {
    CodeBracketIcon,
    ClipboardDocumentIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';
import Toast from './Toast';

interface CodeExample {
    title: string;
    description: string;
    code: string;
    image: string;
    category: string;
}

const examples: CodeExample[] = [
    {
        title: 'Animated Button',
        description: 'A beautiful button with hover animation',
        category: 'UI Components',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHg9IjQwIiB5PSIzMCIgcng9IjgiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsaWNrIG1lITwvdGV4dD4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
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
        title: 'Navigation Menu',
        description: 'Responsive navigation menu with dropdown',
        category: 'Navigation',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNjAiIHg9IjEwIiB5PSIyMCIgcng9IjgiIGZpbGw9IiMzMzMiLz4KPHRleHQgeD0iMzAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5Ib21lPC90ZXh0Pgo8dGV4dCB4PSI4MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiPkFib3V0PC90ZXh0Pgo8dGV4dCB4PSIxMzAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5Db250YWN0PC90ZXh0Pgo8L3N2Zz4=',
        code: `\`\`\`html
<nav class="navbar">
  <div class="nav-brand">Logo</div>
  <ul class="nav-menu">
    <li><a href="#home">Home</a></li>
    <li class="dropdown">
      <a href="#services">Services ▼</a>
      <ul class="dropdown-menu">
        <li><a href="#web">Web Design</a></li>
        <li><a href="#mobile">Mobile Apps</a></li>
        <li><a href="#consulting">Consulting</a></li>
      </ul>
    </li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</nav>
\`\`\`

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin: 0 1rem;
  position: relative;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #667eea;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #444;
  min-width: 150px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  border-radius: 4px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  margin: 0;
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #555;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
}
\`\`\`

\`\`\`javascript
// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
\`\`\``,
    },
    {
        title: 'Contact Form',
        description: 'Interactive contact form with validation',
        category: 'Forms',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTMwIiB4PSIxMCIgeT0iMTAiIHJ4PSI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjZGRkIi8+Cjx0ZXh0IHg9IjMwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5OYW1lPC90ZXh0Pgo8dGV4dCB4PSIzMCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiI+RW1haWw8L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiI+TWVzc2FnZTwvdGV4dD4KPHRleHQgeD0iMzAiIHk9IjEzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TZW5kPC90ZXh0Pgo8L3N2Zz4=',
        code: `\`\`\`html
<div class="contact-form">
  <h2>Contact Us</h2>
  <form id="contactForm">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
      <span class="error" id="nameError"></span>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <span class="error" id="emailError"></span>
    </div>
    
    <div class="form-group">
      <label for="subject">Subject</label>
      <select id="subject" name="subject">
        <option value="">Select a subject</option>
        <option value="general">General Inquiry</option>
        <option value="support">Technical Support</option>
        <option value="billing">Billing Question</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
      <span class="error" id="messageError"></span>
    </div>
    
    <button type="submit" class="submit-btn">Send Message</button>
  </form>
</div>
\`\`\`

\`\`\`css
.contact-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.contact-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
\`\`\`

\`\`\`javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Reset errors
  clearErrors();
  
  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Validation
  let isValid = true;
  
  if (name.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }
  
  if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (message.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    setTimeout(() => {
      alert('Message sent successfully!');
      this.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 2000);
  }
});

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  const inputElement = document.getElementById(elementId.replace('Error', ''));
  
  errorElement.textContent = message;
  inputElement.classList.add('error');
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(error => {
    error.textContent = '';
  });
  document.querySelectorAll('input, textarea').forEach(input => {
    input.classList.remove('error');
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
\`\`\``,
    },
    {
        title: 'Product Card',
        description: 'Modern product card design',
        category: 'Cards',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTMwIiB4PSIxMCIgeT0iMTAiIHJ4PSIxMiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI2U1ZTdlYSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iODAiIHg9IjEwIiB5PSIxMCIgcng9IjEyIiBmaWxsPSJ1cmwoI2dyYWQpIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfk7E8L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNtYXJ0cGhvbmU8L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPiQ5OTkuOTk8L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BZGQgdG8gQ2FydDwvdGV4dD4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjdlZWE7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izc2NGJhMjtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=',
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
        title: 'Image Gallery',
        description: 'Responsive image gallery with lightbox',
        category: 'Gallery',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgeD0iMTAiIHk9IjEwIiByeD0iNCIgZmlsbD0iIzY2N2VlYSIvPgo8cmVjdCB3aWR0aD0iNTUiIGhlaWdodD0iNTUiIHg9IjczIiB5PSIxMCIgcng9IjQiIGZpbGw9IiM3NjRiYTIiLz4KPHJlY3Qgd2lkdGg9IjU1IiBoZWlnaHQ9IjU1IiB4PSIxMzYiIHk9IjEwIiByeD0iNCIgZmlsbD0iIzEwYjk4MSIvPgo8cmVjdCB3aWR0aD0iNTUiIGhlaWdodD0iNTUiIHg9IjEwIiB5PSI3MyIgcng9IjQiIGZpbGw9IiNmNTkzMDYiLz4KPHJlY3Qgd2lkdGg9IjU1IiBoZWlnaHQ9IjU1IiB4PSI3MyIgeT0iNzMiIHJ4PSI0IiBmaWxsPSIjOGI1Y2Y2Ii8+CjxyZWN0IHdpZHRoPSI1NSIgaGVpZ2h0PSI1NSIgeD0iMTM2IiB5PSI3MyIgcng9IjQiIGZpbGw9IiNlYz0wY2EiLz4KPC9zdmc+',
        code: `\`\`\`html
<div class="gallery">
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=1">
    <img src="https://picsum.photos/200/150?random=1" alt="Gallery Image 1">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=2">
    <img src="https://picsum.photos/200/150?random=2" alt="Gallery Image 2">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=3">
    <img src="https://picsum.photos/200/150?random=3" alt="Gallery Image 3">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=4">
    <img src="https://picsum.photos/200/150?random=4" alt="Gallery Image 4">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=5">
    <img src="https://picsum.photos/200/150?random=5" alt="Gallery Image 5">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
  <div class="gallery-item" data-image="https://picsum.photos/400/300?random=6">
    <img src="https://picsum.photos/200/150?random=6" alt="Gallery Image 6">
    <div class="overlay">
      <span>View</span>
    </div>
  </div>
</div>

<!-- Lightbox Modal -->
<div class="lightbox" id="lightbox">
  <span class="close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <div class="lightbox-nav">
    <button class="prev">&#10094;</button>
    <button class="next">&#10095;</button>
  </div>
</div>
\`\`\`

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay span {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

/* Lightbox */
.lightbox {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
  margin: auto;
  display: block;
  max-width: 90%;
  max-height: 90%;
  margin-top: 5%;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #bbb;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.prev, .next {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s;
}

.prev:hover, .next:hover {
  background: rgba(0, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
\`\`\`

\`\`\`javascript
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    currentImageIndex = index;
    const imageUrl = this.getAttribute('data-image');
    lightboxImg.src = imageUrl;
    lightbox.style.display = 'block';
  });
});

// Close lightbox
document.querySelector('.close').addEventListener('click', function() {
  lightbox.style.display = 'none';
});

// Close on background click
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Navigation
document.querySelector('.prev').addEventListener('click', function() {
  currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
  const imageUrl = galleryItems[currentImageIndex].getAttribute('data-image');
  lightboxImg.src = imageUrl;
});

document.querySelector('.next').addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
  const imageUrl = galleryItems[currentImageIndex].getAttribute('data-image');
  lightboxImg.src = imageUrl;
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (lightbox.style.display === 'block') {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    } else if (e.key === 'ArrowLeft') {
      document.querySelector('.prev').click();
    } else if (e.key === 'ArrowRight') {
      document.querySelector('.next').click();
    }
  }
});
\`\`\``,
    },
    {
        title: 'Countdown Timer',
        description: 'Beautiful countdown timer with animation',
        category: 'Widgets',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTMwIiB4PSIxMCIgeT0iMTAiIHJ4PSIxNSIgZmlsbD0idXJsKCN0aW1lckdyYWQpIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4wNTowMDwvdGV4dD4KPHRleHQgeD0iNzAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3RhcnQ8L3RleHQ+Cjx0ZXh0IHg9IjEzMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SZXNldDwvdGV4dD4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0idGltZXJHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N2VlYTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY0YmEyO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==',
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
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
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

    const handleCopyCode = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setToastMessage('Code copied to clipboard!');
        setShowToast(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    return (
        <div className='w-full'>
            <Toast
                message={toastMessage}
                type='success'
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={2000}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto'>
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
                                        handleCopyCode(example.code, index);
                                    }}
                                    className={`p-1 transition-colors ${copyIconColor}`}
                                    title='Copy code'>
                                    {copiedIndex === index ? (
                                        <CheckIcon className='h-4 w-4 text-green-500' />
                                    ) : (
                                        <ClipboardDocumentIcon className='h-4 w-4' />
                                    )}
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
