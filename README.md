# 💼 Freelance Marketplace Platform

A full-stack application where clients can post jobs and freelancers can apply. The system demonstrates relational database design, complex SQL joins, and a clean React-based frontend for displaying job listings and applicants.

---

## 🚀 Features

### 👤 Clients

* Post jobs with:

  * Title
  * Budget
* View applicants for each job

### 🧑‍💻 Freelancers

* Register and log in
* Browse available jobs
* Apply to jobs with a single click

### 📊 Core Functionality

* Track applications per job
* Prevent duplicate applications
* Display applicants dynamically in the UI

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Component-based architecture
* Custom hooks for state management

### Backend

* Node.js / Express (assumed)
* REST API

### Database

* MySQL
* Relational schema with foreign keys

---

## 🗄️ Database Schema

### Tables:

* `clients`
* `freelancers`
* `jobs`
* `applications` (junction table)

### Relationships:

* One **client → many jobs**
* One **job → many applications**
* One **freelancer → many applications**

---

## 🔗 Key SQL Queries

### Get all jobs with client info

```sql
SELECT 
  jobs.id,
  jobs.title,
  jobs.budget,
  clients.name AS client_name
FROM jobs
INNER JOIN clients ON jobs.client_id = clients.id;
```

---

### Get applicants for a specific job

```sql
SELECT 
  freelancers.id,
  freelancers.name,
  freelancers.email,
  applications.applied_at
FROM applications
INNER JOIN freelancers 
  ON applications.freelancer_id = freelancers.id
WHERE applications.job_id = ?;
```

---

### Get jobs with number of applicants

```sql
SELECT 
  jobs.id,
  jobs.title,
  COUNT(applications.id) AS applicant_count
FROM jobs
LEFT JOIN applications 
  ON jobs.id = applications.job_id
GROUP BY jobs.id;
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/freelance_project.git

# Navigate into the project
cd freelance_project-main

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📂 Project Structure

```
frontend/
  src/
    components/
    pages/
    hooks/
    lib/
    App.jsx
    main.jsx
  index.html
```

---

## 🔥 Key Concepts Demonstrated

* SQL Joins (INNER, LEFT)
* Many-to-many relationships
* Data normalization
* React state management
* API-driven UI rendering

---

## 🧠 Future Improvements

* Authentication (JWT)
* Messaging between client & freelancer
* File uploads (portfolio)
* Payment integration
* Job filtering & search

---

## 📌 Notes

* Ensure MySQL is running before starting backend
* Use environment variables for database credentials
* Avoid duplicate applications using UNIQUE constraints

