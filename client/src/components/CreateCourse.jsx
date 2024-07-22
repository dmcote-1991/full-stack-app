import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateCourse = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = {
      userId: authUser.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    try {
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

      ////////
      console.log("Response Status:", response.status);
      console.log("Response Headers:", [...response.headers.entries()]);
      ////////

      if (response.status === 201) {
        const location = response.headers.get("Location");
        if (location) {
          const courseId = location.split("/").pop();
          navigate(`/courses/${courseId}`);
        } else {
          throw new Error("No Location header in response");
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setErrors(["Error creating course. Please try again."]);
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              ></textarea>
            </div>
          </div>
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
