import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Chip, Button, Grid } from '@mui/material';
import '../styles/JobInfo.css';
import data from '../data/job_item';

// npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

const JobList = () => (
  <div className="job-list-container">
    <List>
      {data.map((item, index) => (
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
  </div>
);

export default JobList;
