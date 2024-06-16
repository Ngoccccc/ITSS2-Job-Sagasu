import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  MenuItem,
  Paper,
  InputBase,
  IconButton,
  Menu,
  Divider,
  Grid,
} from "@mui/material/";
import {
  Search,
  Home,
  Favorite,
  RamenDining,
  Person,
  ArrowDropDown,
  ManageAccounts,
  Logout,
  Login,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
const logoStyle = {
  width: "70px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                color: "black",
                px: 0,
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <NavLink to="/nhatuyendung/" className="nav-link">
                    <Grid sx={{ display: "flex", alignItems: "center" }}>
                      <Home />
                      Trang chủ
                    </Grid>
                  </NavLink>
                </MenuItem>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "black" }}
                />
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <NavLink to="/nhatuyendung/post" className="nav-link">
                    <Grid sx={{ display: "flex", alignItems: "center" }}>
                      Đăng bài tuyển dụng
                    </Grid>
                  </NavLink>
                </MenuItem>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
