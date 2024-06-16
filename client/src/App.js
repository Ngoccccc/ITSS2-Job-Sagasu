import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound";
import Homepage from "./pages/Homepage";
import NhaTuyenDungHome from "./pages/employers/Homepage";
import JobInfo from "./pages/JobInfo";
import VerifyUser from "./pages/VerifyUser";
import CreateSearchJobPost from "./pages/CreateSearchJobPost";
import MyPost from "./pages/MyPost";
import AllowPost from "./pages/employers/AllowPost";
import AdminVerifyUser from "./pages/admin/AdminVerifyUser";
import AdminLayout from "./components/Layout/Admin/Layout";
import AdminHome from "./pages/admin/AdminHome";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/job-info" element={<JobInfo />} />
        <Route path="/create-post" element={<CreateSearchJobPost />} />
        <Route path="/my-post" element={<MyPost />} />
        <Route path="/nhatuyendung">
          <Route index element={<NhaTuyenDungHome />} />
          <Route path="post" element={<AllowPost />} />
        </Route>
        <Route path="/admin">
          <Route path="home" element={<AdminHome />} />
          <Route path="verify-user" element={<AdminVerifyUser />} />
          <Route path="verify-user/:email" element={<VerifyUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
