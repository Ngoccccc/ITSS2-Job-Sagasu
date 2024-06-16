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
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Delete, Add, CloudUpload, Close } from "@mui/icons-material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import app from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateSearchJobPost = () => {
  const storage = getStorage(app);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cv, setCv] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({
    experience: [],
    education: [],
  });
  const [focusedField, setFocusedField] = useState({}); // State to track focused fields

  const validateDates = (field, index) => {
    const { start, end } = jobPost[field][index];
    if (start && end && end < start) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: [...prevErrors[field], index],
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: prevErrors[field].filter((i) => i !== index),
      }));
    }
  };

  const [jobPost, setJobPost] = useState({
    name: "",
    title: "",
    summary: "",
    phone: "",
    email: "",
    salary: "",
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

  const handleFocus = (field, index, key) => {
    setFocusedField({ field, index, key });
  };

  const handleBlur = (field, index, key) => {
    // Perform validation logic here
    const startDate = jobPost.education[index].start;
    const endDate = jobPost.education[index].end;

    if (startDate && endDate && endDate < startDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: [...prevErrors[field], index],
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: prevErrors[field].filter((errorIndex) => errorIndex !== index),
      }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCv(file);
      setFileName(file.name);
    }
  };
  const handleUploadCV = async (file, filename) => {
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const cvUrl = await handleUploadCV(cv, `CV/${new Date().getTime()}`);
    setJobPost((prevState) => ({
      ...prevState,
      cv: cvUrl,
    }));
    console.log(jobPost);
    try {
      const data = await axios.post(`api/post/create`, jobPost);
      console.log(data);
      setLoading(false);
      toast.success("Tạo bài tìm việc thành công");
      navigate("/my-post");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Tạo bài đăng không thành công. Vui lòng nhập đẩy đủ thông tin");
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

  const salaryOptions = [
    "5-10 triệu",
    "10-15 triệu",
    "15-20 triệu",
    "20-25 triệu",
    "30-40 triệu",
    "40-50 triệu",
    "Trên 50 triệu",
  ];

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
                      borderColor: errors.education.includes(index)
                        ? "red"
                        : "transparent",
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
                                  error={errors.education.includes(index)}
                                  {...params}
                                  onFocus={() =>
                                    handleFocus("education", index, "start")
                                  }
                                  onBlur={() =>
                                    handleBlur("education", index, "start")
                                  }
                                  helperText={
                                    errors.education.includes(index)
                                      ? "Ngày bắt đầu không hợp lệ"
                                      : ""
                                  }
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
                              <TextField
                                fullWidth
                                margin="normal"
                                error={errors.education.includes(index)}
                                {...params}
                                onBlur={() => validateDates("education", index)}
                              />
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
              </Box>
              {/* Thêm mức lương mong muốn */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Mức lương mong muốn
                </Typography>
                <Select
                  fullWidth
                  value={jobPost.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  margin="normal"
                  label="Mức lương mong muốn"
                  required
                >
                  {salaryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  Tải CV
                </Typography>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Upload CV
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={handleFileUpload}
                  />
                </Button>
                {cv && (
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      {fileName}
                    </Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setCv(null);
                        setFileName("");
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                )}
              </Grid>
              <Button
                variant="contained"
                // type="submit"
                disabled={loading}
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
