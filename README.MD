# Nebula

Nebula is a modern cloud file sharing platform with a beautiful web interface and secure backend. Easily upload, manage, and share your files with credits-based access and Stripe payments.

## Features

- 🚀 Drag & drop file uploads
- 📂 File management (view, download, delete, share)
- 🔗 Public and private file sharing
- 💳 Credits system for uploads
- 🛒 Stripe integration for purchasing credits
- 📈 Transaction history
- 🧑‍💻 User authentication (Clerk)
- 🌈 Responsive, modern UI (React + Tailwind)
- ☁️ Backend with Spring Boot, MongoDB, AWS S3

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Java, Spring Boot, MongoDB, AWS S3
- **Payments:** Stripe
- **Auth:** Clerk

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17+
- MongoDB
- AWS S3 bucket
- Stripe account
- Clerk account

### 1. Clone the repository
```sh
git clone https://github.com/ManuelAleman/nebula.git
cd nebula
```

### 2. Setup the Backend
```sh
cd nebula-api
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your MongoDB, AWS, Stripe, Clerk credentials
./mvnw spring-boot:run
```

### 3. Setup the Frontend
```sh
cd ../nebula-web-app
cp .env.example .env
# Edit .env with your API URL and Clerk/Stripe keys
npm install
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:5173](http://localhost:5173)

## Folder Structure

```
nebula/
  nebula-api/         # Spring Boot backend
  nebula-web-app/     # React frontend
```

## Main Scripts

- **Backend:**
  - `./mvnw spring-boot:run` (dev)
  - `./mvnw package` (build JAR)
- **Frontend:**
  - `npm run dev` (dev)
  - `npm run build` (production build)

