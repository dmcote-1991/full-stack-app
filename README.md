# School Database

A full-stack application for managing a school database. Users can browse, create, update, and delete courses while ensuring secure access through authentication.

## Features

- **Course Management**: View all courses, access course details, and perform CRUD operations (create, read, update, delete) on courses.
- **User Authentication**: Register and log in users with secure password encryption.
- **Responsive Design**: A user-friendly interface that works seamlessly across devices.

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **React Router**: For client-side routing.
- **React Context API**: For state management.
- **CSS**: For styling the application.

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building the REST API.
- **SQLite**: Lightweight relational database.
- **Sequelize ORM**: Database modeling and query handling.
- **bcrypt**: For password hashing and authentication.
- **nodemon**: For automatic server restarts during development.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/dmcote-1991/full-stack-app.git
   cd full-stack-app
   ```
2. **Install dependencies for both frontend and backend:**
   ```bash
   cd api
   npm install
   cd ../client
   npm install
   ```
3. **Seed the database (Backend):** Navigate to the `api` folder and run:
   ```bash
   npm run seed
   ```
4. **Start the backend server:**
   ```bash
   cd api
   npm start
   ```
5. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```
6. Open your browser and navigate to the local development URL provided by Vite.

## Project Structure
The project is organized into two main sections: the API and the client, representing the backend and frontend of the application. Below is the complete structure of the project:

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
│ ├── public/ # Static assets 
│ │ └── vite.svg 
│ ├── src/ # Application source files 
│ │ ├── components/ # React components 
│ │ │ ├── CourseDetail.jsx 
│ │ │ ├── Courses.jsx 
│ │ │ ├── CreateCourse.jsx 
│ │ │ ├── Forbidden.jsx 
│ │ │ ├── Header.jsx 
│ │ │ ├── NotFound.jsx 
│ │ │ ├── PrivateRoute.jsx 
│ │ │ ├── UnhandledError.jsx 
│ │ │ ├── UpdateCourse.jsx 
│ │ │ ├── UserSignIn.jsx 
│ │ │ ├── UserSignUp.jsx 
│ │ │ └── ValidationErrors.jsx 
│ │ ├── context/ # Context for state management 
│ │ │ ├── AuthContext.jsx 
│ │ │ └── useAuth.jsx 
│ │ ├── styles/ # CSS files 
│ │ │ ├── global.css 
│ │ │ └── reset.css 
│ │ ├── App.jsx # Main React component 
│ │ └── main.jsx # Entry point for the React app 
│ ├── .eslintrc.cjs # ESLint configuration 
│ ├── .gitignore # Git ignore rules 
│ ├── index.html # Entry point HTML file 
│ ├── package-lock.json # Dependency lock file 
│ ├── package.json # Dependency manifest 
│ ├── README.md # Frontend README 
│ └── vite.config.js # Vite configuration 
├── node_modules/ # Project dependencies (auto-generated) 
├── .gitignore # Git ignore rules 
└── README.md # Project README
```

### Notes
- The **API** folder contains all backend-related files, including database models, configurations, and migrations.
- The **Client** folder contains the frontend React application, with components, styles, and context for state management.
- The root directory includes shared configuration files and this main project README.

## API Documentation

The backend provides a RESTful API to interact with the school database. The API includes routes for:

- User authentication
- Course management (CRUD operations)

You can find detailed API documentation and test collections in the `api` folder, including:

- `RESTAPI.postman_collection.json`: For testing API endpoints in Postman.
- `tests.http`: HTTP scripts for endpoint testing.

## Development Scripts

### Frontend
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.

### Backend
- `npm start`: Start the backend server.
- `npm run seed`: Seed the database with sample data.

## Notes
- The backend uses SQLite for development, making it lightweight and portable.
- Passwords are securely hashed using `bcrypt` for authentication.
- The frontend is built with Vite, enabling fast development and optimized builds.

## Contributing

Feel free to fork the repository, submit issues, or make pull requests. Contributions are welcome!
