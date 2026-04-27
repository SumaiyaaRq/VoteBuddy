# VoteBuddy 🗳️

VoteBuddy is an intelligent, production-ready web application designed to help users understand and navigate the election process. Built with Next.js, Firebase, and a focus on premium accessibility.

## ✨ Features

- **🔐 Secure Auth**: Google & Email authentication.
- **🤖 AI Assistant**: Neutral, conversational guidance for election processes.
- **📊 Dashboard**: Personalized election timeline and status tracking.
- **✅ Eligibility Checker**: Step-by-step tool to verify voting readiness.
- **📍 Polling Locator**: Find your nearest voting station with ease.
- **🌍 Multilingual**: Support for English, Spanish, and Hindi.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript
- **Backend**: Firebase Auth & Firestore
- **Styling**: Vanilla CSS (Premium Glassmorphism)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Validation**: Zod

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- Firebase Project

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local` and fill in your keys:
- Firebase Client Config
- Firebase Admin SDK Keys
- Google Maps API Key

### 4. Development
```bash
npm run dev
```

### 5. Testing
```bash
npm test          # Run unit tests
npm run e2e      # Run Playwright tests
```

## 🔐 Security & Neutrality
VoteBuddy is designed following OWASP best practices. It remains strictly neutral, providing only factual election information from verified sources.

## ♿ Accessibility
This project follows WCAG 2.1 guidelines to ensure voting information is accessible to everyone, regardless of ability or language.