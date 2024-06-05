import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/VerifyUserStyles.css";

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
      <div className="verify-user"style={{ marginLeft: "200px" }}>
        <div className="div">
          <div className="overlap-group">
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
            <img className="group" alt="Group" src={user.avata} />
            <div className="text-wrapper-4">{user.company}</div>
            <p className="p">{user.companyaddress}</p>
          </div>
          <div className="frame-2">
            <div className="frame-3"></div>
            <div className="frame-4">
              <div className="text-wrapper-6">Họ và tên: {user.name}</div>
              <div className="text-wrapper-6">Email: {user.email}</div>
              <div className="text-wrapper-6">Số điện thoại: {user.phone}</div>
              <div className="text-wrapper-6">Công ty: {user.company}</div>
              <div className="text-wrapper-6">Địa chỉ công ty: {user.companyaddress}</div>
            </div>
          </div>
          <div className="frame-5">
            <div className="frame-6">
              <div className="text-wrapper-7">Ảnh chụp cầm CCCD</div>
              <img className="img" alt="Group" src={user.faceImage} />
            </div>
            <div className="frame-6">
              <div className="text-wrapper-7">Ảnh CCCD</div>
              <img className="group-2" alt="Group" src={user.idPhoto} />
            </div>
          </div>
          <div className="group-3">
            <button className="button-refuse" onClick={handleRefuse}>
              <img className="group-4" alt="Refuse" src="images/refuse1.png" />
            </button>
            <button className="button-agree" onClick={handleAgree}>
              <img className="group-5" alt="Agree" src="images/agree1.png" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyUser;
