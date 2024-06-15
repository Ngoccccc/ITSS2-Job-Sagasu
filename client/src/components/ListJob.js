import React, { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import {
  List,
  Space,
  Row,
  Col,
  Button,
  Tag,
  Input,
  Select,
  InputNumber,
  Form,
} from "antd";
import "../styles/JobInfo.css";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const JobList = () => {
  const [listJob, setListJob] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [salary, setSalary] = useState(null);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/recruitment/get-posts`);
      console.log("Response data:", response.data);
      if (response.data && Array.isArray(response.data)) {
        setListJob(response.data);
        setFilteredJobs(response.data);
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

  useEffect(() => {
    handleSearch();
  }, [
    searchKeyword,
    selectedLocation,
    selectedCategory,
    selectedPosition,
    salary,
    listJob,
  ]);

  const handleSearch = () => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = listJob.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(keyword) ||
        job.category.name.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword) ||
        job.level.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword) ||
        job.position.name.toLowerCase().includes(keyword);

      const matchesLocation = selectedLocation
        ? job.location === selectedLocation
        : true;
      const matchesCategory = selectedCategory
        ? job.category.name === selectedCategory
        : true;
      const matchesPosition = selectedPosition
        ? job.position.name === selectedPosition
        : true;
      const matchesSalary = salary
        ? job.minSalary <= salary && job.maxSalary >= salary
        : true;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCategory &&
        matchesPosition &&
        matchesSalary
      );
    });
    setFilteredJobs(filtered);
  };

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

  const uniqueCategories = [
    ...new Set(listJob.map((job) => job.category.name)),
  ];
  const uniquePositions = [...new Set(listJob.map((job) => job.position.name))];

  return (
    <div className="job-list-container">
      <Row justify="center" style={{ width: "100%", marginBottom: "20px" }}>
        <Col span={16}>
          <Input
            placeholder="Nhập từ khóa tìm kiếm"
            size="large"
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Form layout="vertical" style={{ width: "100%" }}>
        <Row
          justify="center"
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col span={5}>
            <Form.Item label="Nơi làm việc">
              <Select
                placeholder="Chọn nơi làm việc"
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => setSelectedLocation(value)}
              >
                <Option value="">Tất cả</Option>
                <Option value="Hà Nội">Hà Nội</Option>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Lĩnh vực">
              <Select
                placeholder="Chọn lĩnh vực làm việc"
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => setSelectedCategory(value)}
              >
                <Option value="">Tất cả</Option>
                {uniqueCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Vị trí">
              <Select
                placeholder="Chọn vị trí công việc"
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => setSelectedPosition(value)}
              >
                <Option value="">Tất cả</Option>
                {uniquePositions.map((position) => (
                  <Option key={position} value={position}>
                    {position}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Mức lương mong muốn">
              <InputNumber
                placeholder="Nhập mức lương"
                size="large"
                style={{ width: "100%" }}
                onChange={(value) => setSalary(value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <List
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        itemLayout="vertical"
        size="large"
        dataSource={filteredJobs}
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
