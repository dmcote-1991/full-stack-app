import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    user: {},
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          throw new Error("Failed to fetch course details");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      } else {
        throw new Error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
