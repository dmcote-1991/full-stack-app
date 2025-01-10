# School Database

This full stack application allows users to administer a school database containing information about courses. Users can retrieve a list of courses, view details for a specific course, and create, update, and delete courses in the database.

## Features

- **Course Management**: View, add, update, and delete courses.
- **User Authentication**: Register and log in users.

## Technologies Used

- **Frontend**: React.js
- **Backend**: School Database REST API (Node.js, Express)
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: CSS

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/dmcote-1991/full-stack-app.git
   cd full-stack-app
   ```

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
