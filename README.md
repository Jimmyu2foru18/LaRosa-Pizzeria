# LaRosa's Pizzeria

A modern, full-stack capable web application for LaRosa's Pizzeria in West Hempstead, NY. This project features a responsive menu, interactive shopping cart, AI-powered concierge ("Luigi"), and a complete employee portal.

## Features

*   **Interactive Menu**: Filter by category, vegetarian/spicy tags, and search functionality.
*   **Smart Cart**: Handles complex pizza toppings, half/full tray catering logic, and sales tax calculations.
*   **AI Concierge**: Integrated Google Gemini API ("Luigi") to answer customer questions in real-time.
*   **Employee Portal**: PIN-protected dashboard for staff to clock in/out and view schedules.
*   **Responsive Design**: Mobile-first architecture using Tailwind CSS.
*   **Catering & Events**: Dedicated sections for party planning and bulk ordering.

## Tech Stack

*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
*   **Icons**: Lucide React
*   **Routing**: React Router DOM

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Jimmyu2foru18/LaRosa-Pizzeria.git
    cd LaRosa-Pizzeria
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a file named `.env` in the root directory.
    Add your Google Gemini API Key:
    ```env
    API_KEY=your_actual_api_key_here
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

