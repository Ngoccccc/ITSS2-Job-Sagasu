import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound";
import Homepage from "./pages/Homepage";
import JobInfo from "./pages/JobInfo";
import VerifyUser from "./pages/VerifyUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/job-info" element={<JobInfo />} />
        <Route path="/verify-user" element={<VerifyUser />} />
      </Routes>
    </>
  );
}

export default App;
