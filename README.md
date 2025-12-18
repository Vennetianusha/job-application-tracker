# 🚀 Job Application Tracking System (ATS) – Backend

A backend system for managing job applications with workflow enforcement, role-based access control (RBAC), and asynchronous background processing.

This project demonstrates real-world backend engineering concepts such as state machines, background workers, and secure API design.

---

## 📌 Project Overview

This project is a Job Application Tracking System (ATS) backend built using Node.js and Express.  
It allows candidates to apply for jobs, recruiters and admins to manage application stages, and strictly enforces valid workflow transitions.

The system integrates Redis and BullMQ to handle asynchronous email notifications using a background worker, ensuring non-blocking API responses.

---

## 🏗️ Architecture Overview

The application follows a decoupled backend architecture with clear separation of concerns.

### Components

- Express API  
  Handles authentication, authorization, and workflow validation.

- MySQL Database  
  Stores users, job applications, and application status history.

- Redis + BullMQ  
  Used as a message queue for background jobs.

- Background Worker  
  Runs as a separate Node.js process and processes email notifications asynchronously.

### Request Flow

1. Client sends request to API  
2. API validates JWT token and user role  
3. Workflow rules are checked  
4. Database is updated  
5. Email job is added to the queue  
6. Background worker processes the job  

---

## 🔄 Application Workflow (State Machine)

Only valid workflow transitions are allowed.

SUBMITTED → REVIEWED → INTERVIEW → OFFERED → HIRED
↘
REJECTED

yaml
Copy code

Invalid transitions are blocked with proper error messages.

---

## 🔐 Role-Based Access Control (RBAC)

| Endpoint | Applicant | Recruiter | Admin |
|--------|----------|-----------|-------|
| POST /auth/register | Yes | Yes | Yes |
| POST /auth/login | Yes | Yes | Yes |
| POST /api/applications | Yes | No | No |
| PUT /api/applications/status | No | Yes | Yes |

Unauthorized access returns HTTP 403.

---

## 🗄️ Database Design

Main tables used in the system:

- users  
- job_applications  
- application_status_history  

Database constraints:
- Unique email for users  
- ENUM for application status  
- Foreign key relationships  

---

## ⚙️ Tech Stack

- Backend: Node.js, Express  
- Database: MySQL  
- Authentication: JWT, bcrypt  
- Queue: BullMQ  
- Broker: Redis (Memurai on Windows)  
- API Testing: Postman  

---

## 🛠️ Setup Instructions

### Install Dependencies

```bash
npm install
Environment Variables
Create a .env file in the root directory.

env
Copy code
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=job_tracker
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
Do not commit the .env file to GitHub.

Run the API Server
bash
Copy code
npm run dev
Expected output:

arduino
Copy code
Server running on port 5000
MySQL connected successfully
Run Background Worker (New Terminal)
bash
Copy code
node src/workers/emailWorker.js
Expected output:

bash
Copy code
Email worker started and waiting for jobs
🧪 API Testing (Postman)
A Postman collection is included for easy API testing.

File location:

mathematica
Copy code
postman/Job-Application-Tracker.postman_collection.json
Steps:

Open Postman

Click Import

Select the JSON file

Run requests in order

📧 Asynchronous Email Notifications
Email notifications are processed asynchronously using Redis and BullMQ.
The API does not wait for email processing, ensuring fast responses.

Email sending is currently simulated using logs.

🎥 Video Demonstration
A short 3–5 minute demo video demonstrates:

Applicant applying for a job

Recruiter reviewing and updating status

Background worker processing email jobs

✅ Key Features
JWT authentication

Role-based access control

Workflow state machine enforcement

Redis and BullMQ background jobs

Separate worker process

📈 What This Project Demonstrates
Real-world backend system design

Secure API development

Workflow and state management

Asynchronous background processing

🙌 Author
Anusha Pavani Venneti

📄 License
This project is created for educational and portfolio purposes only.

© 2025 Anusha Pavani Venneti. All rights reserved.
