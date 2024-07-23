import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else if (response.status === 500) {
          navigate("/error");
        } else {
          console.error("Error fetching courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        navigate("/error");
      }
    };

    fetchCourses();
  }, [navigate]); // Dependency to re-fetch if 'navigate' changes

  // Display message if no courses are available
  if (courses.length === 0) {
    return <div>No courses available.</div>;
  }

  return (
    <main>
      <div className="wrap main--grid">
        {/* Map through courses and create a link for each course */}
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
        {/* Link to create a new course */}
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
