# Full Stack User Management App

This is a beginner-friendly full stack project built using React, Node.js, Express, and MongoDB.
It includes authentication, user management (CRUD), and password reset features.

## Tech Stack

Frontend: React (Vite), Axios, React Router
Backend: Node.js, Express, JWT, bcrypt
Database: MongoDB with Mongoose

## Main Features

• User login with JWT authentication
• Password hashing for security
• Forgot & Reset password system
• Admin dashboard after login
• User Management (Create, Read, Update, Delete)
• Role-based access (Admin/User)
• Soft delete (users marked inactive, not removed)

## Project Structure

frontend → React
backend → Node/Express

## Backend Setup

1. cd backend
2. npm install
3. npm run start (runs on [http://localhost:5000](http://localhost:5000))

## Frontend Setup

1. cd frontend
2. npm install
3. npm run dev

## Run Full App

Start backend after build → open [http://localhost:5000](http://localhost:5000)

## Admin Login (example)

Email: [admin@test.com](mailto:admin@test.com)
Password: Admin@123

## API Endpoints

POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id

This project shows how frontend, backend, and database work together in a real application.
