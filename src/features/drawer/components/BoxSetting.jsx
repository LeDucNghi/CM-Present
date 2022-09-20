import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import Typography from "@mui/material/Typography";
import { logout } from "features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function BoxSetting() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const settings = [
    {
      id: 1,
      name: "Account",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      id: 2,
      name: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      id: 3,
      name: "Logout",
      icon: <LogoutIcon fontSize="small" />,
    },
  ];

  const handleSettingChange = (name) => {
    setAnchorEl(null);
    if (name === "Logout") dispatch(logout());
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => handleSettingChange(setting.name)}
          >
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
