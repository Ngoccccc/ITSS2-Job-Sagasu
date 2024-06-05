import React from 'react';
import {  MessageOutlined, HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Row, Col, Button, Tag } from 'antd';
import '../styles/JobInfo.css';
import data from '../data/job_item';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const JobList = () => (
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
            dataSource={data}
            renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                <IconText icon={HeartOutlined} text="" key="list-vertical-star-o" />,
                <IconText icon={DeleteOutlined} text="" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="62" key="list-vertical-message" />,
                ]}
            >
                <Row className="job-list-item">
                <Col span={4}>
                    <img width={100} alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7REqw7jqtkLlQq7bmE9ctf2VF57Ttq7HCg&s" />
                </Col>
                <Col span={16}>
                    <h3 className="job-title">
                    <a href={item.href}>{item.title}</a>
                    </h3>
                    <p className="company-name">{item.company}</p>
                    <p className="job-meta">
                    <Tag>{item.location}</Tag>
                    <Tag>{item.position}</Tag>
                    <Tag>{`Còn ${item.daysLeft} ngày để ứng tuyển`}</Tag>
                    <Tag>{`Cập nhật ${item.updated}`}</Tag>
                    </p>
                </Col>
                <Col span={4} className="job-salary-col">
                    <p className="job-salary">{item.salary}</p>
                    <Button type="primary">Ứng tuyển</Button>
                </Col>
                </Row>
            </List.Item>
            )}
        />
    </div>
);

export default JobList;
