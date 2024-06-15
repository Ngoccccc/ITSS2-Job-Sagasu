import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Delete, Add, CloudUpload } from "@mui/icons-material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import app from "../firebase";
const CreateSearchJobPost = () => {
  const storage = getStorage(app);
  const [cv, setCv] = useState(null);
  const [jobPost, setJobPost] = useState({
    name: "",
    title: "",
    summary: "",
    phone: "",
    email: "",
    experience: [
      { company: "", role: "", start: null, end: null, achievements: "" },
    ],
    skills: [""],
    education: [
      { institution: "", degree: "", start: null, end: null, achievement: "" },
    ],
    cv: "",
  });


  const handleChange = (field, value) => {
    setJobPost({ ...jobPost, [field]: value });
  };


  const handleUploadCV = async (file, filename) => {
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };


  const handleSubmit = async () => {
    const cvUrl = await handleUploadCV(cv, `CV/${new Date().getTime()}`);
    setJobPost((prevState) => ({
      ...prevState,
      cv: cvUrl,
    }));
    console.log(jobPost);
    try {
      const data = await axios.post(`api/post/create`, jobPost);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleChangeNested = (field, index, key, value) => {
    const newItems = [...jobPost[field]];
    if (field === "skills") {
      newItems[index] = value; // Handle skills as an array of strings
    } else {
      newItems[index][key] = value; // Handle other fields as arrays of objects
    }
    setJobPost({ ...jobPost, [field]: newItems });
  };


  const handleAddNested = (field, newItem) => {
    setJobPost({ ...jobPost, [field]: [...jobPost[field], newItem] });
  };


  const handleRemoveNested = (field, index) => {
    const newItems = jobPost[field].filter((_, i) => i !== index);
    setJobPost({ ...jobPost, [field]: newItems });
  };


  return (
    <Layout>
      <Grid
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Paper
          sx={{
            width: "80%",
            py: 3,
            px: 5,
          }}
          component="form"
          // onSubmit={handleSubmit}
        >
          <FormControl>
            <Typography variant="h4">Đăng bài tìm việc làm</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Tên"
              value={jobPost.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tiêu đề"
              value={jobPost.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Giới thiệu chung về bản thân và công việc muốn tìm kiếm"
              multiline
              rows={3}
              value={jobPost.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Số điện thoại"
              value={jobPost.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={jobPost.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />


            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Kinh nghiệm làm việc
              </Typography>
              {jobPost.experience.map((exp, index) => (
                <Grid
                  key={index}
                  sx={{
                    mb: 2,
                    pb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <Typography>Kinh nghiệm làm việc {index + 1}</Typography>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Công ty"
                        value={exp.company}
                        onChange={(e) =>
                          handleChangeNested(
                            "experience",
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      sx={{ display: "flex", alignItems: "center", mt: 4 }}
                    >
                      <Grid sx={{ mx: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            views={["year", "month"]}
                            label="Bắt đầu"
                            minDate={new Date("2000-01-01")}
                            maxDate={new Date()}
                            value={exp.start}
                            onChange={(newValue) =>
                              handleChangeNested(
                                "experience",
                                index,
                                "start",
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={["year", "month"]}
                          label="Kết thúc"
                          minDate={new Date("2000-01-01")}
                          maxDate={new Date()}
                          value={exp.end}
                          onChange={(newValue) =>
                            handleChangeNested(
                              "experience",
                              index,
                              "end",
                              newValue
                            )
                          }
                          renderInput={(params) => (
                            <TextField fullWidth margin="normal" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>


                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Vai trò"
                        value={exp.role}
                        onChange={(e) =>
                          handleChangeNested(
                            "experience",
                            index,
                            "role",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Thành tựu"
                        multiline
                        rows={2}
                        value={exp.achievements}
                        onChange={(e) =>
                          handleChangeNested(
                            "experience",
                            index,
                            "achievements",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <IconButton
                    onClick={() => handleRemoveNested("experience", index)}
                    sx={{ ml: 1 }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              ))}
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() =>
                    handleAddNested("experience", {
                      company: "",
                      role: "",
                      start: null,
                      end: null,
                      achievements: "",
                    })
                  }
                >
                  Thêm kinh nghiệm
                </Button>
              </Grid>
            </Box>


            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Kỹ năng</Typography>
              {jobPost.skills.map((skill, index) => (
                <Box
                  key={index}
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Kỹ năng"
                    value={skill}
                    onChange={(e) =>
                      handleChangeNested("skills", index, "", e.target.value)
                    }
                    required
                  />
                  <IconButton
                    onClick={() => handleRemoveNested("skills", index)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => handleAddNested("skills", "")}
                >
                  Thêm kỹ năng
                </Button>
              </Grid>
            </Box>


            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Học vấn
              </Typography>
              {jobPost.education.map((education, index) => (
                <Grid
                  key={index}
                  sx={{
                    pb: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <Typography>Học vấn {index + 1}</Typography>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Trường"
                        value={education.institution}
                        onChange={(e) =>
                          handleChangeNested(
                            "education",
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      sx={{ display: "flex", alignItems: "center", mt: 4 }}
                    >
                      <Grid sx={{ mx: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            views={["year", "month"]}
                            label="Bắt đầu"
                            minDate={new Date("2000-01-01")}
                            maxDate={new Date()}
                            value={education.start}
                            onChange={(newValue) =>
                              handleChangeNested(
                                "education",
                                index,
                                "start",
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>


                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={["year", "month"]}
                          label="Kết thúc"
                          minDate={new Date("2000-01-01")}
                          maxDate={new Date()}
                          value={education.end}
                          onChange={(newValue) =>
                            handleChangeNested(
                              "education",
                              index,
                              "end",
                              newValue
                            )
                          }
                          renderInput={(params) => (
                            <TextField fullWidth margin="normal" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Ngành học"
                        value={education.degree}
                        onChange={(e) =>
                          handleChangeNested(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Thành tựu"
                        multiline
                        rows={2}
                        value={education.achievement}
                        onChange={(e) =>
                          handleChangeNested(
                            "education",
                            index,
                            "achievement",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <IconButton
                    onClick={() => handleRemoveNested("education", index)}
                    sx={{ ml: 1 }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              ))}
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() =>
                    handleAddNested("education", {
                      institution: "",
                      degree: "",
                      start: null,
                      end: null,
                      achievement: "",
                    })
                  }
                >
                  Thêm học vấn
                </Button>
              </Grid>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  Tải CV
                </Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload CV
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(event) => setCv(event.target.files[0])}
                  />
                </Button>
              </Grid>
              <Button
                variant="contained"
                // type="submit"
                sx={{
                  mt: 3,
                  marginLeft: "auto",
                  display: "block",
                }}
                onClick={handleSubmit}
              >
                Đăng bài tìm việc
              </Button>
            </Box>
          </FormControl>
        </Paper>
      </Grid>
    </Layout>
  );
};


export default CreateSearchJobPost;
