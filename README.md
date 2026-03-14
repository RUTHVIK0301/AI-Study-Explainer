# 🚀 AI Study Topic Explainer

A lightweight AI-powered web application that helps students quickly
understand study topics with clear and simple explanations.

Just type a topic like **"Binary Search", "Photosynthesis", or "Neural
Networks"**, and the app generates an easy-to-understand explanation
suitable for quick revision.

------------------------------------------------------------------------

# 📖 Overview

Studying complex subjects can sometimes be confusing. This project
solves that by providing **short, student-friendly explanations** using
AI.

The application sends the topic to a secure server endpoint which
communicates with **Google Gemini AI** to generate the explanation.

🔐 The API key is kept **server-side**, ensuring it is never exposed in
the browser.

------------------------------------------------------------------------

# ⚙️ How the System Works

1.  User enters a topic in the UI\
2.  Frontend sends request to `POST /api/explain`\
3.  Server API receives the request\
4.  AI helper builds a prompt\
5.  Google Gemini generates the explanation\
6.  Response is returned to the UI

All AI logic runs on the **backend**, keeping the API key safe.

------------------------------------------------------------------------

# ✨ Features

-   AI-powered topic explanations
-   Student-friendly summaries
-   Secure server-side API usage
-   Loading states and error handling
-   Clean UI with formatted explanations

------------------------------------------------------------------------

# 🧰 Tech Stack

-   **Next.js (App Router)**
-   **TypeScript**
-   **Tailwind CSS**
-   **Google Gemini AI**
-   **@google/generative-ai SDK**

------------------------------------------------------------------------

# 📦 Requirements

Make sure the following are installed:

-   Node.js 20+
-   Gemini API Key

Check versions:

``` bash
node -v
npm -v
```

------------------------------------------------------------------------

# 🚀 Setup Instructions

## 1. Install Dependencies

``` bash
npm install
```

## 2. Create Environment File

Create `.env.local` in the root folder.

``` env
GOOGLE_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-flash-latest
```

Important:

-   Do not commit `.env.local` to GitHub
-   Restart the server after editing environment variables

------------------------------------------------------------------------

## 3. Start Development Server

``` bash
npm run dev
```

Open in browser:

http://localhost:3000

------------------------------------------------------------------------

# 📂 Project Structure

    src/
     ├── app/
     │   ├── api/explain/route.ts
     │   └── page.tsx
     ├── components/
     └── lib/
         └── aiClient.ts

------------------------------------------------------------------------

# 🔌 API

### POST /api/explain

Request:

``` json
{
  "topic": "Photosynthesis"
}
```

Response:

``` json
{
  "ok": true,
  "explanation": "..."
}
```

Error:

``` json
{
  "ok": false,
  "error": {
    "message": "...",
    "code": "..."
  }
}
```

------------------------------------------------------------------------

# 🛠 Troubleshooting

## API Key Rejected

-   Verify `GOOGLE_API_KEY` in `.env.local`
-   Restart `npm run dev`
-   Generate a new key if necessary

------------------------------------------------------------------------

## Model Not Found

Run:

``` bash
npm run list-models
```

Then update:

    GEMINI_MODEL=gemini-2.0-flash

Restart the server.

------------------------------------------------------------------------

## Rate Limit

If quota exceeded:

-   Wait 30--60 seconds
-   Try again

------------------------------------------------------------------------

# ☁️ Deployment

Deploy using **Vercel**

1.  Push repo to GitHub
2.  Import project into Vercel
3.  Add environment variables

```{=html}
<!-- -->
```
    GOOGLE_API_KEY
    GEMINI_MODEL

4.  Deploy

------------------------------------------------------------------------

# 🔐 Security

-   Never expose API keys in frontend code
-   Store keys in `.env.local`
-   Use server-side API routes only

------------------------------------------------------------------------

# ⭐ AI Study Topic Explainer

A simple AI-powered tool that helps students understand topics faster.
