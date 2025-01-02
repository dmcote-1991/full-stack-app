import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ValidationErrors from "./ValidationErrors";

const CreateCourse = () => {
  // Retriece authenticated user from context
  const { user: authUser } = useAuth();

  const navigate = useNavigate();

  // State variables for form fields and error messages
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create course object to send in request body
    const course = {
      userId: authUser.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    try {
      // Send POST request to create a new course
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${authUser.emailAddress}:${authUser.password}`
          )}`,
        },
        body: JSON.stringify(course),
      });

      if (response.status === 201) {
        // If creation is successful, navigate to the new course's detail page
        const location = response.headers.get("Location");
        if (location) {
          // Extract course ID from Location header
          const courseId = location.split("/").pop();
          navigate(`/courses/${courseId}`);
        } else {
          throw new Error("No Location header in response");
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else if (response.status === 500) {
        navigate("/error");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setErrors(["Error creating course. Please try again."]);
      navigate("/error");
    }
  };

  // Display a loading message if the user is not authenticated yet
  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={handleSubmit} aria-labelledby="create-course-form">
          <fieldset>
            <legend id="create-course-form" hidden>Course Information</legend>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  aria-required="true"
                  placeholder="Enter a descriptive title for the course."
                />

                <p>
                  By {authUser.firstName} {authUser.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="courseDescription-desc"
                  placeholder="Provide a detailed description of the course."
                ></textarea>
                <p id="courseDescription-desc" className="sr-only">
                  Provide a detailed description that outlines the course's
                  content and goals.
                </p>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="Enter the estimated time to complete the course."
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                  aria-describedby="materialsNeeded-desc"
                  placeholder="List the materials required for the course."
                ></textarea>
                <p id="materialsNeeded-desc" className="sr-only">
                  Specify any materials or resources required to complete the
                  course.
                </p>
              </div>
            </div>
          </fieldset>
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
