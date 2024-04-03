# E-Learning Express API Documentation

This documentation outlines the available endpoints and functionalities of the E-Learning Express API.

## Table of Contents

- [User](#user)
  - [Get User](#get-user)
  - [Update User](#update-user)
  - [Upload Profile](#upload-profile)
- [Courses](#courses)
  - [View Course](#view-course)
  - [View EnrollCourse](#view-enrollcourse)
  - [Create Course](#create-course)
  - [Update Course](#update-course)
  - [Enroll Course](#enroll-course)
- [Auth](#auth)
  - [Reset Password](#reset-password)
  - [Confirm Reset](#confirm-reset)
  - [Login](#login)
  - [Refresh Token](#refresh-token)
  - [Register](#register)

## User

### Get User

- **URL:** `http://localhost:3000/api/v1/user/1`
- **Method:** `GET`

Retrieve user information by ID.

### Update User

- **URL:** `http://localhost:3000/api/v1/user/1`
- **Method:** `PUT`

Update user information by ID.

### Upload Profile

- **URL:** `http://localhost:3000/api/v1/user/1/uploadProfile`
- **Method:** `PUT`

Upload user profile picture.

## Courses

### View Course

- **URL:** `http://localhost:3000/api/v1/course?page=1&limit=3&category=Programming&level=Intermediate`
- **Method:** `GET`

View courses based on category and level with pagination.

### View EnrollCourse

- **URL:** `http://localhost:3000/api/v1/enrollCourse/`
- **Method:** `GET`

View enrolled courses.

### Create Course

- **URL:** `http://localhost:3000/api/v1/course`
- **Method:** `POST`

Create a new course.

### Update Course

- **URL:** `http://localhost:3000/api/v1/course/3`
- **Method:** `PUT`

Update a course by ID.

### Enroll Course

- **URL:** `http://localhost:3000/api/v1/enrollCourse/3/enroll`
- **Method:** `PUT`

Enroll in a course by ID.

## Auth

### Reset Password

- **URL:** `http://localhost:3000/api/v1/auth/resetPassword`
- **Method:** `POST`

Initiate password reset by providing email.

### Confirm Reset

- **URL:** `http://localhost:3000/api/v1/auth/reset-password/38746b3920ba1119a6dfa701fc13eedd5f20a78e678f77f5869b70e1660cb6ab`
- **Method:** `POST`

Confirm password reset by providing new password.

### Login

- **URL:** `http://localhost:3000/api/v1/user/login`
- **Method:** `POST`

Login by providing email and password.

### Refresh Token

- **URL:** `http://localhost:3000/api/v1/user/refresh`
- **Method:** `GET`

Refresh authentication token.

### Register

- **URL:** `http://localhost:3000/api/v1/user/register`
- **Method:** `POST`

Register a new user.
