# Deployment Guide

## Overview

This guide covers deploying Chat Runner to various platforms and environments.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Environment variables configured
- Build process tested locally

## Environment Variables

Create a `.env.production` file:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Chat Runner
NEXT_PUBLIC_APP_VERSION=1.0.0
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

## Build Process

### Local Build Test

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the production build
npm start
```

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for unused dependencies
npm run lint
npm run type-check
```

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Setup

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

#### Configuration

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://your-domain.com"
  }
}
```

#### Environment Variables in Vercel

1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add your environment variables

### 2. Netlify

#### Setup

1. **Build Command**
```bash
npm run build
```

2. **Publish Directory**
```
out
```

3. **Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

#### Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NEXT_PUBLIC_API_URL = "https://your-domain.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS Amplify

#### Setup

1. **Connect Repository**
   - Connect your Git repository
   - Select Next.js framework

2. **Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 4. Docker Deployment

#### Dockerfile

```dockerfile
# Use the official Node.js runtime as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  chat-runner:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://your-domain.com
    restart: unless-stopped
```

### 5. Kubernetes

#### Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chat-runner
spec:
  replicas: 3
  selector:
    matchLabels:
      app: chat-runner
  template:
    metadata:
      labels:
        app: chat-runner
    spec:
      containers:
      - name: chat-runner
        image: your-registry/chat-runner:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_API_URL
          value: "https://your-domain.com"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

#### Service YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: chat-runner-service
spec:
  selector:
    app: chat-runner
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

## CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - out/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $DEPLOY_WEBHOOK
  only:
    - main
```

## Performance Optimization

### 1. Image Optimization

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

### 2. Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

### 3. Caching Strategy

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## Monitoring and Logging

### 1. Error Tracking

```typescript
// pages/_app.tsx
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### 2. Performance Monitoring

```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

## Security Considerations

### 1. HTTPS Only

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
}
```

### 2. Content Security Policy

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Verify environment variables

2. **Runtime Errors**
   - Check browser console
   - Verify API endpoints
   - Check network connectivity

3. **Performance Issues**
   - Analyze bundle size
   - Check image optimization
   - Monitor server resources

### Debug Commands

```bash
# Check build output
npm run build

# Analyze bundle
npm run analyze

# Check types
npm run type-check

# Lint code
npm run lint

# Test application
npm test
```

## Rollback Strategy

### 1. Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
```

### 2. Docker Rollback

```bash
# List images
docker images

# Rollback to previous image
docker run -p 3000:3000 your-registry/chat-runner:previous-tag
```

### 3. Kubernetes Rollback

```bash
# List deployments
kubectl get deployments

# Rollback to previous revision
kubectl rollout undo deployment/chat-runner
``` 