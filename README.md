# Employee CRUD Application

![.NET Core](https://img.shields.io/badge/.NET%20Core-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![Angular](https://img.shields.io/badge/Angular%2017-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

A full-stack Employee Management System with CRUD operations, built with Angular 17 frontend and .NET Core backend.

## 📋 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Backend (.NET Core API)](#backend-net-core-api)
  - [Frontend (Angular 17)](#frontend-angular-17)
- [Running the Application](#-running-the-application)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)

## 🔍 Overview

This application provides a complete solution for managing employee data through a modern, responsive interface. Users can create, read, update, and delete employee records with ease.

## 🛠 Prerequisites

Make sure you have the following installed:

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v16.x or newer)
- [Angular CLI](https://angular.io/cli)
  ```bash
  npm install -g @angular/cli
  ```
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express edition works fine)

## 🚀 Installation & Setup

### Backend (.NET Core API)

1. Navigate to the server directory:
   ```bash
   cd EmployeeCRUDServer
   ```

2. Restore the required .NET packages:
   ```bash
   dotnet restore
   ```

3. Build the application:
   ```bash
   dotnet build
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

   > **Note:** On first run, Entity Framework will automatically apply any pending migrations to create or update the database schema. No additional steps are required for database initialization.

5. The API is running on `https://localhost:7248`

### Frontend (Angular 17)

1. Navigate to the client directory:
   ```bash
   cd EmployeeCRUDClient
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. The Angular application should now be running on `http://localhost:4200`.

## 🖥 Running the Application

1. Ensure both the backend API and frontend application are running simultaneously.
2. Open your browser and navigate to `http://localhost:4200`.
3. You should now see the application interface and be able to manage employee data.

![App Screenshot Placeholder](https://via.placeholder.com/800x400?text=Employee+CRUD+App)

## ✨ Features

- ✅ View a list of all employees
- ✅ Add new employees
- ✅ Edit existing employee details
- ✅ Delete employees
- ✅ Search and filter capabilities
- ✅ Responsive design for desktop and mobile



## 💻 Technologies

### Backend
- **Framework:** .NET Core API
- **ORM:** Entity Framework Core
- **Database:** SQL Server
- **Architecture:** RESTful API

### Frontend
- **Framework:** Angular 17
- **Language:** TypeScript
- **State Management:** RxJS
- **UI Components:** Angular Material (if applicable)


## 📄 License

[MIT](LICENSE)

---

Made with ❤️ by [0x0desha74](https://github.com/0x0desha74)
