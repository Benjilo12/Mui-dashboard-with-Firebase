import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  InputBase,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../../theme";
import { doSignOut } from "../../../firebase/auth";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/"); // Navigate to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          backgroundColor:
            theme.palette.mode === "light" ? "#cc4f55" : colors.primary[400],
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: colors.primary[400],
            borderRadius: "3px",
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Tooltip title="Light/Dark">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <Link to="/form">
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={handleClickOpen}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 800, color: "white" }}>
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 800, color: "white" }}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: colors.blueAccent[500], fontWeight: 800 }}
          >
            No
          </Button>
          <Button
            onClick={handleSignOut}
            sx={{ backgroundColor: colors.blueAccent[500], fontWeight: 800 }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Topbar;
