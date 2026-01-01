# LaRosa’s Pizzeria

## Overview

**LaRosa’s Pizzeria** is a modern, full‑stack capable web application designed for the fictional LaRosa’s Pizzeria in West Hempstead, NY. This project features a responsive menu, interactive shopping cart experience, AI‑powered concierge assistant (“Luigi”), and a secure employee portal — all built with React, TypeScript, and Tailwind CSS.

---

## Features

### User‑Facing

- **Responsive Menu** – Filter pizzas by category, dietary tags, and search  
- **Interactive Cart** – Handles pizza customization, special toppings, half/full tray logic, and sales tax  
- **AI Concierge** – Integrated with Google Gemini API (“Luigi”) to answer customer questions in real time  
- **Catering & Events** – Dedicated pages for event planning and bulk order options  

### Employee Portal

- **PIN‑Protected Dashboard** – Secure staff access  
- **Schedule & Time Tracking** – View schedules and clock in/out  

### Design & Interactivity

- **Responsive Design** – Mobile‑first layout using Tailwind CSS  
- **Smooth UI Interactions** – Built with reusable React components  
- **Route‑Based Navigation** – Using React Router DOM  

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite  
- **Styling:** Tailwind CSS  
- **AI Integration:** Google Gemini SDK (Gemini 2.5 Flash)  
- **Icons:** Lucide React  
- **Routing:** React Router DOM  

---

## Installation

### 1. Clone the Repository

~~~bash
git clone https://github.com/Jimmyu2foru18/LaRosa-Pizzeria.git
cd LaRosa-Pizzeria
~~~

### 2. Install Dependencies

~~~bash
npm install
~~~

### 3. Environment Setup

Create a `.env` file in the root directory and add your Google Gemini API key:

~~~bash
API_KEY=your_actual_api_key_here
~~~

### 4. Run the Development Server

~~~bash
npm run dev
~~~

The app will start on the local development server (usually `http://localhost:3000`).

---

## Project Structure

~~~text
LaRosa-Pizzeria/
├── components/        # Reusable UI components
├── services/          # API logic and service modules
├── App.tsx            # Main app and routing setup
├── constants.ts       # Shared constants
├── types.ts           # TypeScript types
├── index.html         # HTML entry point
├── index.tsx          # React app entry
├── metadata.json      # App metadata
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite project configuration
~~~

---
