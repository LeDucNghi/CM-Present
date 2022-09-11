import * as React from "react";

import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import { StyledMenu } from "utils/styledMUI";
import { handleChangeLanguage } from "../drawerThunk";
import { useDispatch } from "react-redux";

export default function LanguageMenus() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = React.useState("Eng");

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={Boolean(anchorEl) ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={(event) => setAnchorEl(event.currentTarget)}
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
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() =>
            dispatch(handleChangeLanguage(1, setLanguage, setAnchorEl))
          }
          disableRipple
        >
          <LanguageIcon />
          <p>VN</p>
        </MenuItem>
        <MenuItem
          onClick={() =>
            dispatch(handleChangeLanguage(2, setLanguage, setAnchorEl))
          }
          disableRipple
        >
          <LanguageIcon />
          <p>Eng</p>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
