import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import useAuth from "../context/useAuth";

const CourseDetail = () => {
  // Extract course ID from URL parameters
  const { id } = useParams();

  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details from API
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (!data) {
            navigate("/notfound");
          } else {
            setCourse(data);
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

    fetchCourse();
  }, [id, navigate]); // Dependencies to re-fetch if 'id' or 'navigate' changes

  // Handle course deletion
  const handleDelete = async () => {
    // Confirm deletion with user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? Deleting courses cannot be undone."
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Basic Auth header with encoded credentials
              Authorization: `Basic ${btoa(
                `${authUser.emailAddress}:${authUser.password}`
              )}`,
            },
          }
        );
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error deleting course:", response.statusText);
          navigate("/error");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        navigate("/error");
      }
    }
  };

  // Display loading message while course data is being fetched
  if (!course) return <div>Loading...</div>;

  // Check if the current user is the course owner
  const isCourseOwner = () => {
    return authUser && course.user && authUser.id === course.user.id;
  };

  // Convert materialsNeeded to Markdown format for ReactMarkdown
  const materialsMarkdown = course.materialsNeeded
    ? course.materialsNeeded
        .split("\n")
        .map((item) => `* ${item}`)
        .join("\n")
    : "";

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* Conditionally render Update and Delete buttons based on ownership */}
          {isCourseOwner() && (
            <>
              <Link 
                className="button" 
                to={`/courses/${id}/update`}
                aria-label="Update this course"
              >
                Update Course
              </Link>
              <button 
                className="button" 
                onClick={handleDelete}
                aria-label="Delete this course"
              >
                Delete Course
              </button>
            </>
          )}
          <Link 
            className="button button-secondary" 
            to="/"
            aria-label="Return to course list"
          >
            Return to List
          </Link>
        </div>
      </div>

      <section className="wrap">
        <h2 tabIndex="0">Course Detail</h2>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>
              By{" "}
              {course.user
                ? `${course.user.firstName} ${course.user.lastName}`
                : "Unknown Author"}
            </p>

            {/* Render course description using ReactMarkdown */}
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime || "Not provided"}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            {/* Render materials needed using ReactMarkdown */}
            <ReactMarkdown>{materialsMarkdown}</ReactMarkdown>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
