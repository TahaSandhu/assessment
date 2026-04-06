# Interview Task

This repository contains a full-stack application with a Next.js frontend and a Node.js/Express backend.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## Getting Started

### 1. Backend Setup

First, set up and run the backend server.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   We have provided an `.env.example` file that contains all the necessary credentials. Create your `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
   *(If you're on Windows Command Prompt, use `copy .env.example .env`)*

4. Run the backend development server:
   ```bash
   npm run dev
   ```
   The backend will be running at `http://localhost:5050` (or whichever port is specified in your `.env`).

### 2. Frontend Setup

Next, set up and start the frontend application. Open a **new terminal window/tab** so the backend can keep running.

1. Navigate to the frontend directory from the root of the project:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

---

## Production Build

If you wish to run the project in a production-like environment instead of development mode, follow these steps:

### Backend Production
```bash
cd backend
npm run build
npm start
```

### Frontend Production
```bash
cd frontend
npm run build
npm start
```
