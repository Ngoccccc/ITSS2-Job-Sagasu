import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/Admin/Layout";
import { List, Space, Row, Col, Button, Tag } from "antd";
import "../../styles/JobInfo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminVerifyUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`/api/user/admin/get-inactive-user`);
      console.log("Response data:", response.data);
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <AdminLayout>
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <h5>Danh sách user cần xác thực</h5>
          </Col>
          <Col></Col>
        </Row>
        <List
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6,
          }}
          itemLayout="vertical"
          size="large"
          dataSource={users}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              onClick={() => navigate(`/admin/verify-user/${item.email}`)}
            >
              <Row className="job-list-item">
                <Col span={16}>
                  <h3 className="job-title">
                    <p>{item.name}</p>
                  </h3>
                  <p className="job-meta">
                    <Tag>{item.email}</Tag>
                    <Tag>{item.phone}</Tag>
                  </p>
                </Col>
                <Col span={4} className="job-salary-col"></Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminVerifyUser;
