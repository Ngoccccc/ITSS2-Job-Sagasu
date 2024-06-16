import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/VerifyUserStyles.css";
import { Avatar, Button, Paper, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/Layout/Admin/Layout";
import apiURL from "../instances/apiConfig";
const VerifyUser = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState([]);
  const email = useParams();
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/api/user/get-user-with-email`,
        email
      );
      console.log(response);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const handleRefuse = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/admin/verify-user");
    }, 1000);
  };

  const handleAgree = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/api/user/admin/active-user`,
        email
      );

      if (response.status === 200) {
        console.log(response);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/admin/verify-user");
        }, 1000);
      }
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleOK = () => {
    setShowAlert(false);
  };

  return (
    <AdminLayout>
      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <p>Thao tác thành công!</p>
            <button onClick={handleOK}>OK</button>
          </div>
        </div>
      )}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          py: 3,
          px: 5,
        }}
      >
        <div className="verify-user">
          <div className="div">
            <Paper>
              <div className="frame">
                <div className="nh-th">
                  <div className="text-wrapper-2">Thẻ nhân viên</div>
                  <img
                    className="image"
                    alt="Image"
                    src={userData.companyPhoto}
                  />
                </div>
              </div>
              <div className="text-wrapper-3">{userData.name}</div>
              <div className="group">
                <Avatar
                  alt="Remy Sharp"
                  src={userData.avata}
                  sx={{ width: 180, height: 180 }}
                />
              </div>
              <div className="text-wrapper-4">{userData.company}</div>
              <p className="p">{userData.companyAddress}</p>
            </Paper>
            <div className="frame-2">
              <div className="frame-3"></div>
              <div className="frame-4">
                <CardContent>
                  <div className="text-wrapper-6">
                    Họ và tên: {userData.name}
                  </div>
                </CardContent>
                <CardContent>
                  <div className="text-wrapper-6">Email: {userData.email}</div>
                </CardContent>
                <CardContent>
                  <div className="text-wrapper-6">
                    Số điện thoại: {userData.phone}
                  </div>
                </CardContent>
                <CardContent>
                  <div className="text-wrapper-6">
                    Công ty: {userData.company}
                  </div>
                </CardContent>
                <CardContent>
                  <div className="text-wrapper-6">
                    Địa chỉ công ty: {userData.companyAddress}
                  </div>
                </CardContent>
              </div>
            </div>
            <div
              className="frame-5"
              sx={{
                mt: 3,
                marginLeft: "auto",
                display: "block",
              }}
            >
              <div className="frame-6">
                <div className="text-wrapper-7">Ảnh chụp cầm CCCD</div>
                <img className="group-2" alt="Group" src={userData.faceImage} />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-7">Ảnh CCCD</div>
                <img className="group-2" alt="Group" src={userData.idPhoto} />
              </div>
            </div>
            <div className="group-3">
              <Button
                variant="contained"
                size="large"
                onClick={handleAgree}
                className="button"
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleRefuse}
                color="error"
                className="button"
              >
                Từ chối
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </AdminLayout>
  );
};

export default VerifyUser;
