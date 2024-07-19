import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
// import CreateCourse from "./components/CreateCourse";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          {/* <Route path="/courses/create" element={<CreateCourse />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
