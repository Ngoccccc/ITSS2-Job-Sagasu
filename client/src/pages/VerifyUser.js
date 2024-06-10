import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/VerifyUserStyles.css";
import {
  Avatar,
  Button,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

const VerifyUser = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  const handleRefuse = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
    }, 2000);
  };

  const handleAgree = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
    }, 2000);
  };

  const handleOK = () => {
    setShowAlert(false);
  };

  if (userData.length === 0) {
    return <div>Loading...</div>;
  }

  const user = userData[currentIndex];

  return (
    <Layout>
      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <p>Thao tác thành công!</p>
            <button onClick={handleOK}>OK</button>
          </div>
        </div>
      )}
      <Paper elevation={3} sx={{
        width: "100%",
        py: 3,
        px: 5,
      }}>
        <div className="verify-user">
          <div className="div">
            <Paper>
              <div className="frame">
                <div className="nh-th">
                  <div className="text-wrapper-2">Thẻ nhân viên</div>
                  <img
                    className="image"
                    alt="Image"
                    src={user.companyPhoto}
                  />
                </div>
              </div>
              <div className="text-wrapper-3">{user.name}</div>
              <div className="group" >
                <Avatar alt="Remy Sharp" src={user.avata} sx={{ width: 180, height: 180 }} />
              </div>
              <div className="text-wrapper-4">{user.company}</div>
              <p className="p">{user.companyaddress}</p>
            </Paper>
            <div className="frame-2">
              <div className="frame-3"></div>
              <div className="frame-4">
                <CardContent>
                  <div className="text-wrapper-6">Họ và tên: {user.name}</div>
                </CardContent>
                <CardContent>
                  <div className="text-wrapper-6">Email: {user.email}</div>
                </CardContent>
                <CardContent><div className="text-wrapper-6">Số điện thoại: {user.phone}</div></CardContent>
                <CardContent><div className="text-wrapper-6">Công ty: {user.company}</div></CardContent>
                <CardContent><div className="text-wrapper-6">Địa chỉ công ty: {user.companyaddress}</div></CardContent>
              </div>
            </div>
            <div className="frame-5" sx={{
              mt: 3,
              marginLeft: "auto",
              display: "block",
            }}>

              <div className="frame-6">
                <div className="text-wrapper-7">Ảnh chụp cầm CCCD</div>
                <img className="group-2" alt="Group" src={user.faceImage} />
              </div>
              <div className="frame-6">
                <div className="text-wrapper-7">Ảnh CCCD</div>
                <img className="group-2" alt="Group" src={user.idPhoto} />
              </div>
            </div>
            <div className="group-3">
              <Button variant="contained" size="large" onClick={handleRefuse} className="button">
                Chấp nhận
              </Button>
              <Button variant="contained" size="large" onClick={handleRefuse} color="error" className="button">
                Từ chối
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Layout>
  );
};

export default VerifyUser;
