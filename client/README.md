# School Database - Frontend

The frontend of the School Database application, built with React.js, allows users to browse, create, update, and delete courses while ensuring a responsive and user-friendly interface.

## Features

- **Course Management**: 
  - View all courses and detailed course information.
  - Perform CRUD operations (create, read, update, delete) on courses.
- **User Authentication**: 
  - Sign in and sign up functionality with secure authentication.
- **Responsive Design**: 
  - Optimized for seamless use across devices.

## Technologies Used

- **React.js**: For building the user interface.
- **React Router**: For client-side routing.
- **React Context API**: For state management.
- **CSS**: For styling the application.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/dmcote-1991/full-stack-app.git
   cd full-stack-app/client
2. **Install dependencies:**
  ```bash
  npm install
  ```
3. **Start the development server:**
  ```bash
  npm run dev
  ```
4. Open your browser and navigate to the local development URL provided by Vite.

## Project Structure

```bash
client/ # Frontend code
├── public/ # Static assets
│   └── vite.svg
├── src/ # Application source files
│   ├── components/ # React components
│   │   ├── CourseDetail.jsx
│   │   ├── Courses.jsx
│   │   ├── CreateCourse.jsx
│   │   ├── Forbidden.jsx
│   │   ├── Header.jsx
│   │   ├── NotFound.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── UnhandledError.jsx
│   │   ├── UpdateCourse.jsx
│   │   ├── UserSignIn.jsx
│   │   ├── UserSignUp.jsx
│   │   └── ValidationErrors.jsx
│   ├── context/ # Context for state management
│   │   ├── AuthContext.jsx
│   │   └── useAuth.jsx
│   ├── styles/ # CSS files
│   │   ├── global.css
│   │   └── reset.css
│   ├── App.jsx # Main React component
│   └── main.jsx # Entry point for the React app
├── index.html # Entry point HTML file
├── package-lock.json # Dependency lock file
├── package.json # Dependency manifest
├── .gitignore # Git ignore rules
├── .eslintrc.cjs # ESLint configuration
├── vite.config.js # Vite configuration
└── README.md # Frontend README
```

### Notes
- The `src/components` folder contains all React components used to build the UI.
- The `src/context` folder implements React Context API for managing authentication state.
- Global and reset styles are defined in the `src/styles` folder.

## Development Scripts

- **Start development server:**
  ```bash
  npm run dev
  ```
- **Build for production:**
  ```bash
  npm run build
  ```
- **Preview production build:**
  ```bash
  npm run preview
  ```

## Contributing

Feel free to fork the repository, submit issues, or make pull requests. Contributions are welcome!
