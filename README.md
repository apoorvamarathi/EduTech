# EduTech Platform

A full-featured Learning Management System (LMS) built with the MERN stack.

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables. Create a `.env` file in the `backend` folder (or update the existing one) with the following keys:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/edutech
    JWT_SECRET=your_jwt_secret_here
    NODE_ENV=development

    # Email (Nodemailer)
    EMAIL_SERVICE=gmail
    EMAIL_USERNAME=your_email@gmail.com
    EMAIL_PASSWORD=your_app_password

    # Storage (Cloudinary)
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Payments (Stripe)
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```
4.  Seed the database (optional):
    ```bash
    npm run seed
    ```
5.  Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

## Features Implemented

- **Authentication**: JWT-based login/signup with role-based access (Student, Instructor, Admin).
- **Course Management**: Instructors can create courses, add lessons, and upload thumbnails.
- **Student Dashboard**: Track enrolled courses and progress.
- **Payments**: Integrated Stripe for course purchases.
- **File Uploads**: Cloudinary integration for media storage.
- **Email Notifications**: Nodemailer for account verification and updates.
