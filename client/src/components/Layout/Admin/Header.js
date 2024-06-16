import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { Button, MenuItem, Menu, Grid } from "@mui/material/";
import { Person, ArrowDropDown, Logout } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const CustomHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ backgroundColor: "#fff" }}
    >
      <Typography.Title level={3}>Đây là tài khoản Admin! 😎</Typography.Title>

      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleProfile}
          sx={{
            borderRadius: "10%",
            textTransform: "none",
            color: "#000",
            padding: "6px",
          }}
        ></Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem sx={{ color: red[500] }}></MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default CustomHeader;
