import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound";
import Homepage from "./pages/Homepage";
import JobInfo from "./pages/JobInfo";
import VerifyUser from "./pages/VerifyUser";
import CreateSearchJobPost from "./pages/CreateSearchJobPost";
import MyPost from "./pages/MyPost";
import AllowPost from "./pages/employers/AllowPost";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/job-info" element={<JobInfo />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="/create-post" element={<CreateSearchJobPost />} />
        <Route path="/my-post" element={<MyPost />} />
        <Route path="/employers-post" element={<AllowPost />} />
      </Routes>
    </>
  );
}

export default App;
