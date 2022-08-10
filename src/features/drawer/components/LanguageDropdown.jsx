import * as React from "react";

import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "constants/styledMUI";
import { postLanguage } from "../drawerSlice";
import { useDispatch } from "react-redux";

export default function LanguageMenus() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = React.useState("Eng");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeLanguage = (id) => {
    if (id === 1) {
      dispatch(postLanguage("VN"));
      setLanguage("VN");
      localStorage.setItem("language", "VN");
    } else {
      dispatch(postLanguage("Eng"));
      setLanguage("Eng");
      localStorage.setItem("language", "Eng");
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {language}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeLanguage(1)} disableRipple>
          <LanguageIcon />
          VN
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage(2)} disableRipple>
          <LanguageIcon />
          Eng
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
