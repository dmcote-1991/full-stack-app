import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
// import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        {/* <Route path="/courses/create" element={<CreateCourse />} /> */}
        <Route path="/signin" element={<UserSignIn />} />
      </Routes>
    </div>
  );
};

export default App;
