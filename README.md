# 🚀 Node.js + TypeScript + MongoDB Authentication API

This is a **secure authentication API** built with **Node.js, TypeScript, Express, and MongoDB**. It implements **JWT authentication using HTTP-only cookies** for web applications.

## 📌 Features
- **TypeScript** for scalable development
- **Express.js** as the backend framework
- **MongoDB & Mongoose** for database management
- **JWT Authentication** using HTTP-only cookies
- **Bcrypt** for secure password hashing
- **Refresh Token Handling** for session management
- **Middleware Protection** for securing routes

---

## 🛠️ Setup & Installation
### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

### 2️⃣ **Install dependencies**
```bash
npm install
```

### 3️⃣ **Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

### 4️⃣ **Run the development server**
```bash
npm run dev
```
The server will start on **`http://localhost:5000`**.

---

## 🔥 API Documentation
### 🔑 **Authentication Routes**

#### 1️⃣ **User Registration**
**Endpoint:** `POST /api/auth/create`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
✅ **Response:**
```json
{
  "status": "success",
  "user": {
    "id": "601c3f45e4567d12d0ef1234",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2️⃣ **User Login**
**Endpoint:** `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
✅ **Response:** *(JWT token stored in HTTP-only cookies)*
```json
{
  "status": "success",
  "user": {
    "id": "601c3f45e4567d12d0ef1234",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 3️⃣ **User Logout**
**Endpoint:** `POST /api/auth/logout`
✅ **Response:**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

### 🛡 **Protected Routes**

#### 4️⃣ **Get Current User (Protected Route)**
**Endpoint:** `GET /api/users/me`
- Requires authentication (**JWT in HTTP-only cookie**)
✅ **Response:**
```json
{
  "id": "601c3f45e4567d12d0ef1234",
  "name": "John Doe",
  "email": "john@example.com"
}
```


---

## 📂 Project Structure
```
backend/
│── src/
│   │── config/         # Database configuration
│   │── controllers/    # API Controllers
│   │── middleware/     # Authentication middleware
│   │── models/         # Mongoose Models
│   │── routes/         # API Routes
│   │── utils/          # Utility functions (error handling, async wrapper, etc.)
│   │── server.ts       # Entry point
│── .env                # Environment variables
│── package.json        # Dependencies & scripts
│── tsconfig.json       # TypeScript configuration
│── nodemon.json       #  Monitors changes in the src/ folder.
```

---

## 🔥 Running in Production
To run in **production mode**, build the project and start it using Node.js:
```bash
npm run build
npm start
```

---


## ⭐ Contributing
Feel free to submit pull requests or open issues to improve the project!

---

## 📄 License
This project is open-source under the **MIT License**.

