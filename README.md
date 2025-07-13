# React Client for Spring Boot Backend

This is a simple React front-end application built to interact with a Spring Boot REST API.  
The frontend provides a UI for users with different roles (`GUEST`, `HOST`, `ADMIN`) to interact with the system. <br /><br />
PS: This project is deployed and you can find it on https://www.bookinline.online, if properties aren't loading, visit page in 5 minutes, I used free hosting so it sleeps after 15 minutes of idling =).

> ⚠️ This project is tightly coupled with the backend and **does not work standalone**.  
You must run the Spring Boot backend for this app to function.
(https://github.com/kokitko/bookinline)

---

## ⚙️ Tech Stack

- **React** (JavaScript)
- **Axios** – for HTTP requests
- **React Router DOM** – for routing
- **React Date Range** & **date-fns** – for date picking and formatting
- **Tailwind CSS** – for styling
- **PropTypes** – for runtime props validation

---

## 🔐 Authentication & Authorization

- Access and Refresh token strategy implemented.
- Role-based routing and access control:
  - `GUEST` – regular users which are able to interact with properties
  - `HOST` – users with permissions of managing properties etc.
  - `ADMIN` – system-level access

---

## 🚀 Getting Started

### 1. Clone this repo

```
git clone https://github.com/kokitko/bookinline-front.git
cd bookinline-front
```

### 2. Install dependencies

```
npm install
```

### 3. Environment variables

Adjust config.js apiUrl (in case you have custom back-end which is not localhost)

### 4. Run the app!

```
npm run dev
```

## ⚠️ Notes & Limitations

 - This frontend is a demo/utility for backend testing and interaction.
 - Error handling is minimal — most server errors are displayed as plain status codes or short messages.
 - No testing setup (Jest, Cypress, etc.).
 - Not perfectly optimized for production.

## 📋 TODO / Ideas

 - Add proper error handling and user-friendly messages
 - Add unit and integration tests
 - Add more loading states and skeletons
 - Optionally migrate to TypeScript

---

Thank you for visiting and viewing my project!

