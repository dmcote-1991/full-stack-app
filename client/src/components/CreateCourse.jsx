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
        <h2 id="page-title">Create Course</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={handleSubmit} aria-labelledby="page-title">
          <fieldset>
            <legend className="sr-only" hidden>Course Information</legend>
            <div className="main--flex">
              <div>
                <label htmlFor="title">Course Title <span aria-hidden="true">*</span></label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="title-desc"
                />
                <p id="title-desc">
                  Enter a descriptive title for the course. This field is required.
                </p>

                <p>
                  By {authUser.firstName} {authUser.lastName}
                </p>

                <label htmlFor="description">Course Description <span aria-hidden="true">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="courseDescription-desc"
                ></textarea>
                <p id="description-desc">
                  Provide a detailed description of the course. This field is required.
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
                  aria-describedby="estimatedTime-desc"
                />
                <p id="estimatedTime-desc">
                  Specify the estimated time needed to complete the course.
                </p>

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                  aria-describedby="materialsNeeded-desc"
                ></textarea>
                <p id="materialsNeeded-desc">
                  List the materials needed for the course.
                </p>
              </div>
            </div>
          </fieldset>

          <button className="button" type="submit" aria-label="Create course">
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            aria-label="Cancel and go back to course details"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
