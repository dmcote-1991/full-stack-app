# School Database Client

## Project Structure

```bash
full-stack-app/ 
├── api/ # Backend code and configurations 
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
