import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import React from "react";
import Typography from "@mui/material/Typography";
import { handleLogout } from "features/auth/authThunk";
import { logout } from "features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function BoxSetting() {
  const dispatch = useDispatch();

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleLogout = () => {
  //   logout();
  // };
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <ListItem
                onClick={
                  setting === "Logout" ? () => dispatch(handleLogout()) : null
                }
              >
                <Typography textAlign="center">{setting}</Typography>
              </ListItem>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}
