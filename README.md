# Wander Log

# 🧳 Travel Article App

A responsive and modern travel blogging platform built with **Vue 3**, **TypeScript**, **Tailwind CSS**, and **Pinia**. Users can register, log in, create/edit/delete travel articles, and share their journeys with others.

---

## 🚀 Features

- 🌍 **Landing Page** with a clean UI and color palette from [ColorHunt](https://colorhunt.co)
- 🔐 **Authentication**: Register, Login, Logout with client-side validation
- 📄 **CRUD Articles**: Create, view, update, and delete travel articles
- 🧠 **Dynamic Filtering**: Filter articles using based on user, title and description
- 🔁 **Infinite Scroll** for article listing
- 📱 Fully **Responsive** (Mobile-first design)
- 🧱 **Skeleton & Spinner Loaders** while loading data
- ⚠️ Global **Error Handling**
- 🧰 Powered by **Pinia** for state management
- 💅 Styled with **TailwindCSS**
- 🎨 **Authentic Google Fonts** and design theme

---

## 🛠️ Tech Stack

| Tech         | Description                   |
| ------------ | ----------------------------- |
| Vue 3        | Frontend Framework            |
| TypeScript   | Static Typing                 |
| Tailwind CSS | Utility-First CSS Framework   |
| Pinia        | State Management              |
| Vite         | Lightning-fast Build Tool     |
| Axios        | HTTP Client for API requests  |
| Font Awesome | Icon Library                  |
| Summernote   | Implemented for colorful logs |

---

## 📂 Project Structure

```txt
src/
├── api/ # Axios API services
├── assets/ # Images, fonts, styles
├── components/ # Reusable UI components
├── myassets/ # background, styles
├── plugins/ # Types and shared utils
├── router/ # Vue Router setup
├── stores/ # Pinia stores
├── views/ # Page views (Landing, Login, Register, etc.)
└── App.vue # Root component
```

---

## ⚙️ Installation & Setup

> Make sure you have [Node.js version > 20](https://nodejs.org/) and [npm] or npm/yarn installed.

```bash
# Clone this repo
git clone https://github.com/dikyardiyanto17/wander_log.git
cd wander_log

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🔐 Authentication

- User credentials (except passwords) are securely managed in **Pinia** state
- Authenticated routes are protected using **navigation guards**
- Authentication integrated via token headers — compatible with mock or real backend

---

## 🔍 Filtering & Pagination

- All data is **fetched once** and then **filtered on the frontend** for faster UX
- Dynamic filters include **user**, **title**, and **description**
- Uses **infinite scrolling** for smooth pagination experience
- Filters are fully **reactive and performant**

---

## 🖋️ Validation & Forms

- Real-time error messages with clear feedback
- Forms included:
  - **Login**
  - **Register**
  - **Article create/edit**
  - **Comment submission**

## 🌗 Theme Support: Light & Dark Mode

- The application supports both **light** and **dark** modes.
- Theme toggling is available via a toggle button using **Font Awesome icons**:
- ☀️ faSun for light mode and 🌙 faMoon for dark mode.
- User preferences are saved using Pinia Persisted State, so the selected theme is remembered across sessions.

## 🗣️ Social Sharing

- Each article detail page includes a **share** button.
- Easy way for users to share their travel articles via **social media, messaging apps, or email**.

---

## ℹ️ Developer Considerations

- 🧑‍💻 **Comment user identification missing** — I couldn’t find any user ID associated with comments, so users cannot delete their own comments.
- ⚠️ **Some error responses are inconsistent** — there are variations in the structure of backend error responses.
- 📦 **Optimized for small dataset** — given the low volume of data, the app **fetches all articles** up front and handles pagination/filtering via **Load More** or dynamic UI filters.
