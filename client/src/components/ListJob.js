import React, { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { List, Space, Row, Col, Button, Tag } from "antd";
import "../styles/JobInfo.css";
import dayjs from "dayjs";
import axios from "axios";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const JobList = () => {
  const [listJob, setListJob] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/recruitment/get-posts`);
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

  const calculateRemainingDays = (timeEnd) => {
    const today = dayjs();
    const endDate = dayjs(timeEnd);
    const diff = endDate.diff(today, "day");
    return diff >= 0 ? `Còn ${diff} ngày để ứng tuyển` : "Hết hạn";
  };

  const calculateHoursSinceUpdate = (updatedAt) => {
    const now = dayjs();
    const updatedDate = dayjs(updatedAt);
    const diff = now.diff(updatedDate, "hour");
    return diff;
  };

  return (
    <div className="job-list-container">
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
              <Col span={4}>
                <img
                  width={100}
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7REqw7jqtkLlQq7bmE9ctf2VF57Ttq7HCg&s"
                />
              </Col>
              <Col span={16}>
                <h3 className="job-title">
                  <p>{item.title}</p>
                </h3>
                <p className="company-name">{item.company}</p>
                <p className="job-meta">
                  <Tag>{item.location}</Tag>
                  <Tag>{item.position.name}</Tag>
                  <Tag>{calculateRemainingDays(item.timeEnd)}</Tag>
                  <Tag>{`Cập nhật ${calculateHoursSinceUpdate(
                    item.updatedAt
                  )} giờ trước`}</Tag>
                </p>
              </Col>
              <Col span={4} className="job-salary-col">
                <p className="job-salary">{`${item.minSalary} - ${item.maxSalary} triệu`}</p>
                <Button className="button-submit" type="primary">
                  Ứng tuyển
                </Button>
                <div className="icon-heart">
                  <IconText
                    icon={HeartOutlined}
                    text=""
                    key="list-vertical-star-o"
                  />
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};
export default JobList;
