# Diamond Jubilee Girls Hostel – MNNIT Allahabad
### Official Hostel Website

A full-stack official hostel portal for Diamond Jubilee Girls Hostel, Motilal Nehru National Institute of Technology Allahabad.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, React Router v7         |
| Styling    | Tailwind CSS (CDN), Google Fonts  |
| Icons      | Lucide React                      |
| Build Tool | Vite 8                            |
| Backend    | Node.js + Express 4               |
| Database   | MongoDB (Mongoose)                |
| Auth       | JWT (jsonwebtoken + bcryptjs)     |

---

## Project Structure

```
djgh/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, Accordion, StatusTimeline, Toast…
│   │   ├── context/      # AdminContext, ToastContext
│   │   ├── data/         # Static fallback data (siteData.js)
│   │   ├── pages/        # All page components
│   │   └── services/     # API service layer (api.js)
│   └── .env.example      # Copy to .env — set VITE_API_URL
│
└── server/          # Express backend
    ├── models/       # Mongoose schemas
    ├── routes/       # Express route handlers
    ├── middleware/   # Auth (JWT) + error handler
    ├── scripts/      # Database seed script
    ├── index.js      # Server entry point
    └── .env.example  # Copy to .env — set MONGODB_URI, JWT_SECRET, etc.
```

> `.env` files are **not** committed. Copy the `.env.example` in each folder to `.env` and fill in your own values before running the project.

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

---

### 1. Backend

```bash
cd server

# Install dependencies (already installed if node_modules exists)
npm install

# Configure environment
cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET, etc.

# Seed the database (run once)
node scripts/seed.js

# Start the server
npm run dev        # with nodemon (development)
# OR
node index.js      # production
```

The API will be available at **http://localhost:5000**

---

### 2. Frontend

```bash
cd client

# Install dependencies (already installed if node_modules exists)
npm install

# Start development server
npm run dev
```

The site will be available at **http://localhost:5173**

---

## Pages

| Route           | Page                          |
|-----------------|-------------------------------|
| `/`             | Home                          |
| `/about`        | About the Hostel              |
| `/facilities`   | Facilities                    |
| `/mess`         | Mess – Menu, Timings, Feedback|
| `/complaints`   | Complaints & Grievance        |
| `/notices`      | Notice Board                  |
| `/committee`    | Hostel Committee              |
| `/hostel-life`  | Hostel Life & Gallery         |
| `/rules`        | Hostel Rules                  |
| `/faq`          | FAQ                           |
| `/contact`      | Contact & Emergency           |
| `/admin`        | Admin Dashboard (protected)   |

---

## Admin Portal

URL: **http://localhost:5173/admin**

Credentials are configured via environment variables in `server/.env`. See `server/.env.example` for the required variables. Run `node scripts/seed.js` after setting your credentials to create the admin account.

Admin features:
- Complaint management (view, filter, update status)
- Notice management (create, publish, delete)
- Mess menu editor (inline weekly menu editing)
- Committee, facilities, FAQ, and contact management panels
- Student/staff directory with CSV import/export
- Mess feedback review

---

## API Endpoints

| Method | Path                              | Auth     | Description              |
|--------|-----------------------------------|----------|--------------------------|
| POST   | `/api/auth/login`                 | Public   | Admin login              |
| GET    | `/api/auth/me`                    | Admin    | Verify token             |
| POST   | `/api/complaints`                 | Public   | Submit complaint         |
| GET    | `/api/complaints/track/:id`       | Public   | Track complaint          |
| GET    | `/api/complaints/resolved/recent` | Public   | Recently resolved        |
| GET    | `/api/complaints`                 | Admin    | List all complaints      |
| PATCH  | `/api/complaints/:id`             | Admin    | Update complaint status  |
| GET    | `/api/notices`                    | Public   | Published notices        |
| POST   | `/api/notices`                    | Admin    | Create notice            |
| GET    | `/api/mess/menu`                  | Public   | Active mess menu         |
| PUT    | `/api/mess/menu`                  | Admin    | Update mess menu         |
| POST   | `/api/mess/feedback`              | Public   | Submit mess feedback     |
| GET    | `/api/committee`                  | Public   | Committee members        |
| GET    | `/api/facilities`                 | Public   | Facilities list          |
| GET    | `/api/events`                     | Public   | Hostel events            |
| GET    | `/api/faqs`                       | Public   | FAQs                     |
| GET    | `/api/contacts`                   | Public   | Emergency contacts       |
| GET    | `/api/health`                     | Public   | Server health check      |

---

## Notes for Administrators

1. **Replace all placeholder text** enclosed in `[square brackets]` with actual names, numbers and details before going live.
2. **Change admin credentials** in `.env` before deployment.
3. **Update the JWT secret** in `.env` to a long, random string.
4. **Google Maps embed** on the Contact page uses a generic MNNIT location. Update with the exact hostel coordinates.
5. **Unsplash images** are used as placeholders. Replace with actual hostel photographs.

---

*Official portal — Diamond Jubilee Girls Hostel, MNNIT Allahabad*
