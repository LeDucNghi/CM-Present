import "assets/styles/ThemingToggle.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "constants/styledMUI";
import { selectMode } from "../drawerSlice";
import { toggleSwitch } from "../drawerThunk";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (mode === "light") setIsOn(false);
    if (mode === "dark") setIsOn(true);
  }, [mode]);

  return (
    <>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isOn}
            ison={isOn}
            onClick={() => dispatch(toggleSwitch(isOn, setIsOn))}
          />
        }
        // label="MUI switch"
      />
    </>
  );
}
