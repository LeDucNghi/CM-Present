import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import React from "react";
import Typography from "@mui/material/Typography";
import { handleLogout } from "features/auth/authThunk";
import { settings } from "constants/global";
import { useDispatch } from "react-redux";

export default function BoxSetting() {
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSettingChange = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") dispatch(handleLogout());
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={(event) => setAnchorElUser(event.currentTarget)}
            sx={{ p: 0 }}
          >
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
          onClose={() => setAnchorElUser(null)}
        >
          <MenuItem>
            {settings.map((setting) => (
              <ListItem
                key={setting}
                onClick={() => handleSettingChange(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </ListItem>
            ))}
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
