import React, { useEffect, useState } from "react";
import "../styles/AllowPost.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import axios from "axios";

const UseAllowPost = () => {
  const [useInfo, setUseInfo] = useState([]);

  const postData = {
    email: "tranvana@example.com",
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`/api/user/get-active-user`, postData);
      console.log("Response data:", response.data);
      if (response.data) {
        setUseInfo(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {useInfo.status === "active" ? (
        <div className="alert-popup">
          <div>
            <Alert severity="success">Bạn có thể bắt đầu đăng bài.</Alert>
          </div>
        </div>
      ) : (
        <div className="alert-popup">
          <Alert severity="warning">Tài khoản bạn chưa được xác minh.</Alert>
        </div>
      )}
    </div>
  );
};

export default UseAllowPost;
