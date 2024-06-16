import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/VerifyUserStyles.css";
import { Avatar, Button, Paper, CardContent } from "@mui/material";

const VerifyUser = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchInactiveUsers = () => {
    fetch('api/user/admin/get-inactive-user')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setCurrentIndex(0); // Reset currentIndex to 0 when new data is fetched
      });
  };

  useEffect(() => {
    fetchInactiveUsers();
  }, []);

  const handleRefuse = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      fetchInactiveUsers();
    }, 2000);
  };

  const handleAgree = () => {
    const user = userData[currentIndex];
    fetch('api/user/admin/active-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })
    .then(response => response.json())
    .then(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        fetchInactiveUsers();
      }, 2000);
    });
  };

  const handleOK = () => {
    setShowAlert(false);
  };

  if (userData.length === 0) {
    return (
      <Layout>
        <div className="no-users-container">
          <div className="no-users-message">
            Không có người dùng cần active
          </div>
        </div>
      </Layout>
    );
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
              <p className="p">{user.companyAddress}</p>
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
                <CardContent><div className="text-wrapper-6">Địa chỉ công ty: {user.companyAddress}</div></CardContent>
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
              <Button variant="contained" size="large" onClick={handleAgree} className="button">
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
