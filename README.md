# Crate — Premium Subscription Boxes 👕👖📦

A modern, high-end subscription service for curated clothing and accessories. Built with a focus on premium UI/UX, scalability, and developer experience.

## ✨ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Shadcn UI, TanStack Table.
- **Backend**: Node.js, Express, Prisma ORM, SQLite (Local Database).
- **Auth**: JWT-based authentication with secure password hashing (bcryptjs).
- **Communication**: REST API with unified error handling.

---

## 🚀 Quick Start & Testing Guide

Follow these steps to get the application running and test its core features.

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### 2. Installation
Open two terminal windows/tabs, one for the server and one for the client.

**In the Server directory:**
```bash
cd server
npm install
```

**In the Client directory:**
```bash
cd client
npm install
```

### 3. Database Initialization
The project uses SQLite, so no external database installation is required.

**In the Server directory:**
```bash
# Generate Prisma Client
npx prisma generate

# Initialize the database and seed initial data (Admin and Crates)
npm run seed
```

### 4. Running the Application
Start both services simultaneously.

**In the Server directory:**
```bash
npm run dev
# API will be listening on http://localhost:3000
```

**In the Client directory:**
```bash
npm run dev
# App will be accessible at http://localhost:5173
```

---

## 🧪 How to Test

Once the application is running, follow this sequence to verify the implementation:

### 1. Explore the Home Page
- Navigate to `http://localhost:5173`.
- Experience the **Premium Branding**: Verify the "STYLE DELIVERED" hero section and smooth entrance animations.
- Complete the **Onboarding Modal**: Walk through the "Welcome to Crate" introduction steps.

### 2. User Authentication
- Click **"Get Started"** or navigate to the signup page.
- **Sign Up**: Create a new account.
- **Login**: Use your new credentials to log in. You should see a success toast: *"Welcome back, [Name]! 👋"*

### 3. Browse and Subscribe
- Navigate to the **Crates** page (`/crates`).
- Verify that the **Seeded Crates** (The Essentialist, Urban Explorer, etc.) appear as high-quality cards.
- Click **"Subscribe Now"**: Verify the success toast appears: *"Subscribed successfully! Welcome to the crate."*

### 4. Admin Functionality
- Login with the admin credentials:
  - **Email**: `admin@crate.test`
  - **Password**: `admin123`
- Access the **Admin Dashboard**: Click the "Admin" link in the header.
- Verify the **Enterprise Overview**: Check the metric cards for Products, Crates, Users, and Subscriptions.
- **Manage Crates**: Try creating or deleting a crate to see the real-time updates.

### 5. Responsive Design
- Resize your browser or use DevTools to verify that the **Split-Screen Auth** and **Crate Cards** tile correctly on mobile devices.

---

## 🛠️ Project Structure

- `/client`: React frontend with Vite. Styles are managed in `src/index.css` using Tailwind v4.
- `/server`: Node/Express backend. Database schema is defined in `prisma/schema.prisma`.
- `dev.db`: Your local SQLite database (auto-generated).
