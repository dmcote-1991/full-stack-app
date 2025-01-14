# School Database - Backend

The backend for the School Database application provides a RESTful API to manage courses and user authentication. It is built with Node.js and Express.js, leveraging Sequelize for database operations and SQLite as the database.

## Features

- **Course Management**: Perform CRUD operations (create, read, update, delete) on courses.
- **User Authentication**: Register and log in users with secure password encryption using bcrypt.
- **Database Management**: SQLite database powered by Sequelize ORM for schema definition and querying.

## Technologies Used

- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for building the REST API.
- **SQLite**: Lightweight relational database.
- **Sequelize ORM**: Database modeling and query handling.
- **bcrypt**: Secure password hashing.
- **nodemon**: Automatic server restarts during development.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/dmcote-1991/full-stack-app.git
   cd full-stack-app/api
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Seed the database:**
   ```bash
   npm run seed
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

## Project Structure

```bash
api/
├── config/                  # Configuration files
│   └── config.json          # Database configuration
├── migrations/              # Sequelize migration files
│   ├── 20240705131034-create-user.js
│   └── 20240705131247-create-course.js
├── models/                  # Sequelize models
│   ├── course.js
│   ├── index.js
│   └── user.js
├── seed/                    # Database seeding files
│   ├── context.js
│   ├── data.json
│   ├── database.js
│   └── index.js
├── app.js                   # Main backend application file
├── fsjstd-restapi.db        # SQLite database file
├── nodemon.json             # Nodemon configuration
├── package.json             # Dependency manifest
├── package-lock.json        # Dependency lock file
├── README.md                # Backend README
├── RESTAPI.postman_collection.json # API collection for testing
└── tests.http               # HTTP test scripts
```

## API Documentation

The backend exposes the following routes:

### User Routes
- `POST /api/users` - Register a new user.
- `GET /api/users` - Retrieve the authenticated user's details.

### Course Routes
- `GET /api/courses` - Retrieve a list of all courses.
- `GET /api/courses/:id` - Retrieve details of a specific course.
- `POST /api/courses` - Create a new course (requires authentication).
- `PUT /api/courses/:id` - Update an existing course (requires authentication).
- `DELETE /api/courses/:id` - Delete a course (requires authentication).

You can find detailed API documentation and test collections in the `api` folder:
- `RESTAPI.postman_collection.json`: For testing API endpoints in Postman.
- `tests.http`: HTTP scripts for endpoint testing.

## Development Scripts

- `npm start`: Start the backend server.
- `npm run seed`: Seed the database with sample data.

## Notes

- The backend uses SQLite for development, making it lightweight and portable.
- Passwords are securely hashed using `bcrypt` to protect user credentials.
- Nodemon is used for development to enable automatic server restarts on file changes.

## Contributing

Feel free to fork the repository, submit issues, or make pull requests. Contributions are welcome!
