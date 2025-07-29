# iTasky - Task Management App

**iTasky** is a modern full-stack task management app that allows users to create, manage, and delete tasks with optional trash recovery. Built with a clean React frontend and a powerful Express/PostgreSQL backend.

---

## Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [React Query](https://tanstack.com/query/latest) (Server State)
- [Material UI (MUI)](https://mui.com/) (UI Components)
- [Vite](https://vitejs.dev/) (Dev Server & Bundler)

###  Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (Password Hashing)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT Authentication)

---

## Live Links

- **Frontend (Vercel)**: [https://i-taskify-app.vercel.app](https://i-taskify-app.vercel.app)
- **Backend (Render)**: [https://itaskify-app.onrender.com](https://itaskify-app.onrender.com)

---


---

## Features

### User Features

- Register / Login (JWT Authentication)
- Create / Update / Delete tasks
- Restore tasks from trash
- Responsive UI with Material UI
- Visual feedback with loading & error states

##  Getting Started

###  1. Clone the Repository

```bash
git clone https://github.com/your-username/itasky.git
cd itasky
```

## Set Environmental Variables

### Server .env

```
DATABASE_URL="postgresql://user:password@localhost:5432/itasky"
JWT_SECRET="your_jwt_secret"
PORT=5600
```

### Client .env

```
VITE_API_URL="https://itaskify-app.onrender.com"
```