import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  if (courses.length === 0) {
    return <div>No courses available.</div>;
  }

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <Link
            key={course.id}
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h2 className="course--lable">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
        <Link
          className="course--modeule course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
