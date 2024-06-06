import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Chip, Button, Grid } from '@mui/material';
import '../styles/JobInfo.css';
import data from '../data/job_item';

const itemsPerPage = 6;

const JobList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="job-list-container">
      <List>
        {currentItems.map((item, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Grid container spacing={2} className="job-list-item">
              <Grid item xs={12} md={2}>
                <ListItemAvatar>
                  <Avatar 
                    variant="square" 
                    alt="logo" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7REqw7jqtkLlQq7bmE9ctf2VF57Ttq7HCg&s" 
                    sx={{ width: 100, height: 100 }}
                  />
                </ListItemAvatar>
              </Grid>
              <Grid item xs={12} md={8}>
                <ListItemText
                  primary={
                    <Typography variant="h6" className="job-title">
                      <a href={item.href}>{item.title}</a>
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" className="company-name">
                        {item.company}
                      </Typography>
                      <Typography variant="body2" className="job-meta">
                        <Chip label={item.location} variant="outlined" />
                        <Chip label={item.position} variant="outlined" />
                        <Chip label={`Còn ${item.daysLeft} ngày để ứng tuyển`} variant="outlined" />
                        <Chip label={`Cập nhật ${item.updated}`} variant="outlined" />
                      </Typography>
                    </>
                  }
                />
              </Grid>
              <Grid item xs={12} md={2} className="job-salary-col">
                <Typography variant="h6" className="job-salary">
                  {item.salary}
                </Typography>
                <Button variant="contained" color="primary" className="button-submit">
                  Ứng tuyển
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <div className="pagination">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Trang trước
        </Button>
        <Typography variant="body2" className="page-info">
          Trang {currentPage} / {Math.ceil(data.length / itemsPerPage)}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNextPage} 
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Trang tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default JobList;
