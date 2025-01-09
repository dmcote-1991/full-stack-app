# School Database REST API

A REST API for administering a school database containing information about users and courses. Users can create an account and, when logged in, can create, read, update, and delete courses.

## Features

- **User Management**: Register and log in users.
- **Course Management**: Add, update, delete, and view courses.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite, Sequelize ORM
- **Authentication**: bcrypt
- **Package Manager**: npm

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/dmcote-1991/rest-api.git
   cd rest-api
   ```

## Project Structure

```bash
full-stack-app/ 
├── api/ # Backend code and configurations 
│ ├── config/ # Configuration files 
│ │ └── config.json # Database configuration 
│ ├── migrations/ # Sequelize migration files 
│ │ ├── 20240705131034-create-user.js 
│ │ └── 20240705131247-create-course.js 
│ ├── models/ # Sequelize models 
│ │ ├── course.js 
│ │ ├── index.js 
│ │ └── user.js 
│ ├── seed/ # Database seeding files 
│ │ ├── context.js 
│ │ ├── data.json 
│ │ ├── database.js 
│ │ └── index.js 
│ ├── app.js # Main backend application file 
│ ├── fsjstd-restapi.db # SQLite database file 
│ ├── nodemon.json # Nodemon configuration 
│ ├── package-lock.json # Dependency lock file 
│ ├── package.json # Dependency manifest 
│ ├── README.md # Backend README 
│ ├── RESTAPI.postman_collection.json # API collection for testing 
│ └── tests.http # HTTP test scripts 
├── client/ # Frontend code 
├── node_modules/ # Project dependencies (auto-generated) 
├── .gitignore # Git ignore rules 
└── README.md # Main Project README
```
