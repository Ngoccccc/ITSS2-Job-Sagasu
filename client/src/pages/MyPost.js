import React, { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { List, Space, Row, Col, Button, Tag } from "antd";
import "../styles/JobInfo.css";
import dayjs from "dayjs";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const MyPost = () => {
  const navigate = useNavigate();
  const [listJob, setListJob] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/post/all-post`);
      console.log("Response data:", response.data);
      if (response.data && Array.isArray(response.data)) {
        setListJob(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Layout />
      <div className="job-list-container">
        <Row
          justify="space-between"
          align="middle"
          className="add-post-button-row"
        >
          <Col>
            <h3>Bài tìm việc đã đăng</h3>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                navigate("/create-post");
              }}
            >
              Thêm bài tìm việc mới
            </Button>
          </Col>
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
          dataSource={listJob}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <Row className="job-list-item">
                <Col span={16}>
                  <h3 className="job-title">
                    <p>{item.title}</p>
                  </h3>
                  <p className="company-name">{item.name}</p>
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
    </>
  );
};

export default MyPost;
