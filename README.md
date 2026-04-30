# 🏡 Lidharshana Homez

A premium full-stack Real Estate Web Application built using the MERN Stack with luxury modern UI, authentication, property management, booking system, admin dashboard, and Cloudinary image uploads.

---

# ✨ Features

## 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse Luxury Properties
- Search Properties
- Property Details Page
- Favorite Properties ❤️
- Property Booking 🏷
- Responsive Premium UI
- Dark Modern Design
- Customer Reviews
- Contact Page

---

## 🏢 Property Features

- Property Listings
- Property Details
- Cloudinary Image Upload
- Property Search
- Pagination
- Animated Property Cards
- Luxury UI Design

---

## 👑 Admin Features

- Admin Authentication
- Admin Dashboard
- Add Property
- Protected Admin Routes
- Secure JWT Authorization
- Upload Property Images

---

# 🚀 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary

---

# 📁 Folder Structure

```bash
Real-Estate/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/lidharshana-homez.git
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 🔐 Environment Variables

Create `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶ Run Project

## Run Backend

```bash
cd backend
npm run dev
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

---

# 🌐 API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Property Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/property | Get Properties |
| GET | /api/property/:id | Get Single Property |
| POST | /api/property | Add Property (Admin) |

---

## Booking Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/booking/:id | Book Property |

---

# 🔒 Authentication

This project uses:

- JWT Authentication
- Protected Routes
- Admin Authorization
- Role-Based Access Control

---

# ☁ Cloudinary Upload

Property images are uploaded using Cloudinary API integration.

---

# 🎨 UI Features

- Glassmorphism UI
- Luxury Animations
- Responsive Design
- Premium Navbar
- Modern Cards
- Gradient Backgrounds
- Hover Effects


---

# 👨‍💻 Author

## Sathya

Full Stack MERN Developer


