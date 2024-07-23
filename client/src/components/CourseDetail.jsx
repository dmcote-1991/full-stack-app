import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          console.error("Error fetching course:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
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
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (!course) return <div>Loading...</div>;

  const isCourseOwner = () => {
    return authUser && course.user && authUser.id === course.user.id;
  };

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
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={handleDelete}>
                Delete Course
              </button>
            </>
          )}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
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

            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ReactMarkdown>{materialsMarkdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
