# 🏡 Lidharshana Homez

A premium full-stack Real Estate Web Application built using the **MERN Stack** with modern luxury UI, user authentication, property listing, booking system, favorites, admin dashboard, role-based access, and Cloudinary image upload.

---

## ✨ Features

### 👤 User Features

- User Registration
- User Login
- JWT Authentication
- Demo User Login
- Browse Luxury Properties
- View Property Details
- Book Properties
- View My Bookings
- Add Favorite Properties
- Contact Admin
- Terms & Privacy Pages
- Responsive Premium UI
- Toast Notifications

---

### 👑 Admin Features

- Demo Admin Login
- Admin Dashboard
- Protected Admin Routes
- Add New Properties
- Upload Property Images
- View Booking Requests
- Approve or Reject Bookings
- Role-Based Authorization

---

### 🏢 Property Features

- Property Listings
- Property Details Page
- Search Properties
- Favorite Properties
- Property Booking
- Cloudinary Image Upload
- Animated Property Cards
- Premium Real Estate UI

---

## 🧪 Demo Credentials

### 👨‍💼 Admin Login

```txt
Email: admin@demo.com
Password: admin123
```

Admin can:

- Access Admin Dashboard
- Add Properties
- Upload Property Images
- View Booking Requests
- Approve or Reject Bookings

---

### 👤 User Login

```txt
Email: user@demo.com
Password: user123
```

User can:

- Browse Properties
- View Property Details
- Book Properties
- Add Favorites
- View My Bookings
- Contact Admin

---

## 🚀 Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast
- Lucide React Icons

---

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cloudinary
- Multer

---

## 📁 Folder Structure

```bash
Real-Estate/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Properties.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── AddProperty.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── Privacy.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/lidharshana-homez.git
```

---

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend `.env`

Create `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

### Frontend `.env`

Create `.env` file inside frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

For deployed backend:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## ▶️ Run Project

### Run Backend

```bash
cd backend
npm run dev
```

---

### Run Frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 API Base URL

Local backend:

```txt
http://localhost:5000/api
```

Deployed backend example:

```txt
https://your-backend-url.onrender.com/api
```

---

## 🔐 Authentication

This project uses:

- JWT Authentication
- Protected Routes
- Admin Authorization
- Role-Based Access Control
- Local Storage Token Handling
- Auth Context

---

## 🧭 Main Routes

### Public Routes

| Route | Page |
|---|---|
| `/login` | Login Page |
| `/register` | Register Page |
| `/forgot-password` | Forgot Password |
| `/reset-password/:token` | Reset Password |
| `/terms` | Terms Page |
| `/privacy` | Privacy Page |

---

### User Protected Routes

| Route | Page |
|---|---|
| `/home` | Home Page |
| `/properties` | Properties Page |
| `/property/:id` | Property Details |
| `/favorites` | Favorite Properties |
| `/my-bookings` | My Bookings |
| `/settings` | Settings |
| `/contact` | Contact |
| `/about` | About |

---

### Admin Protected Routes

| Route | Page |
|---|---|
| `/admin` | Admin Dashboard |
| `/add-property` | Add Property |

---

## 🌐 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

### Property Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/property` | Get All Properties |
| GET | `/api/property/:id` | Get Single Property |
| POST | `/api/property` | Add Property Admin Only |
| PUT | `/api/property/:id` | Update Property Admin Only |
| DELETE | `/api/property/:id` | Delete Property Admin Only |

---

### Booking Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/booking` | Book Property |
| GET | `/api/booking/my-bookings` | Get User Bookings |

---

### Admin Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/bookings` | Get All Booking Requests |
| PATCH | `/api/admin/bookings/:id` | Update Booking Status |

---

### Contact Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Send Contact Message |

---

### Upload Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload` | Upload Property Image |

---

## ☁️ Cloudinary Upload

Property images are uploaded using Cloudinary API integration.

Admin can upload property images while adding a property.

---

## 🎨 UI Features

- Glassmorphism UI
- Luxury Modern Design
- Gradient Backgrounds
- Premium Navbar
- Profile Dropdown
- Responsive Layout
- Animated Cards
- Hover Effects
- Toast Notifications
- Show/Hide Password
- Remember Me
- Demo Credentials Auto Fill

---

## ✅ Mentor Review Notes

This project includes all required demo credentials and role-based access.

```txt
Admin Login:
Email: admin@demo.com
Password: admin123

User Login:
Email: user@demo.com
Password: user123
```

Implemented corrections:

- Demo credentials added
- Admin login added
- User login added
- Admin protected routes fixed
- Login redirect fixed
- Navbar refresh issue fixed
- Toast notifications added
- Remember me added
- Book Property flow added
- My Bookings page added
- Favorites page added
- Terms and Privacy pages added

---

## 👨‍💻 Author

### Sathya

Full Stack MERN Developer 🚀
