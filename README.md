# 📤 YouTube Video Uploader (React + Express + Vite + Tailwind)

A personal YouTube Video Uploader built using **React**, **Express**, **Google APIs**, and styled with **Tailwind CSS**.  
Built for automation, built for convenience! 🎥🚀

---

## ✨ Features

- 📁 Upload **.mp4** videos to your YouTube channel
- 🧾 Upload **.json** metadata files with title, description, tags, etc.
- 🔐 OAuth2 authentication with YouTube
- 💾 Remembers access tokens (locally)
- ⚡ Fast UI with **Vite + Tailwind CSS**
- 🎯 Simple and clean design
- 🧪 Built for **personal use**

---

## ⚙️ Tech Stack

| Tool            | Description                             |
|------------------|-----------------------------------------|
| **React**        | Frontend library                        |
| **Vite**         | Fast dev server & build tool            |
| **Tailwind CSS** | Utility-first styling                   |
| **Express.js**   | Backend API to handle uploads/auth      |
| **Multer**       | Middleware for handling file uploads    |
| **Google APIs**  | YouTube Data API (v3) for video upload  |
| **OAuth2**       | Auth flow with Google                   |
| **Local File**   | Saves access tokens for re-use          |

---

## 🔐 OAuth Setup

1. Create project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **YouTube Data API v3**.
3. Create **OAuth 2.0 Client ID** (Web App).
4. Set **Authorized Redirect URI** to: