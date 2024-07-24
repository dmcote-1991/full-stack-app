import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ValidationErrors from "./ValidationErrors";

const UpdateCourse = () => {
  // Get the course ID from the URL parameters
  const { id } = useParams();

  const navigate = useNavigate();

  // Destructure the authenticated user from the context
  const { user: authUser } = useAuth();
  // State to hold course data
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    user: {},
  });
  // State to hold validation errors
  const [errors, setErrors] = useState([]);

  // Fetch course details when the component mounts or when 'id' or 'authUser.id' changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch the course details from the API
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (!data) {
            navigate("/notfound");
          } else if (authUser.id !== data.user.id) {
            navigate("/forbidden");
          } else {
            setCourse(data); // Set course data in state
          }
        } else if (response.status === 404) {
          navigate("/notfound");
        } else if (response.status === 500) {
          navigate("/error");
        } else {
          console.error("Error fetching course:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        navigate("/error");
      }
    };

    fetchCourseDetails();
  }, [id, navigate, authUser.id]); // Dependencies to re-fetch if 'id', 'navigate', or 'authUser.id' changes

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  // Handle form submission to update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update a course
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${authUser.emailAddress}:${authUser.password}`
          )}`,
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else if (response.status === 500) {
        navigate("/error");
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      navigate("/error");
    }
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {/* Display validation errors, if any */}
        <ValidationErrors errors={errors} />
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="title">Course Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              />

              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>

              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={course.materialsNeeded}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/courses/${id}`);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
