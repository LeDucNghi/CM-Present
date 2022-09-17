import "assets/styles/ThemingToggle.scss";

import { postMode, selectMode } from "../drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "constants/styledMUI";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (mode === "light") setIsOn(false);
    if (mode === "dark") setIsOn(true);
  }, [mode]);

  const toggleSwitch = () => {
    setIsOn(!isOn);

    if (isOn === false) {
      dispatch(postMode("dark"));
      localStorage.setItem("mode", "dark");
    }
    if (isOn === true) {
      dispatch(postMode("light"));
      localStorage.setItem("mode", "light");
    }
  };

  return (
    <>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isOn}
            ison={isOn}
            onClick={() => toggleSwitch(isOn, setIsOn)}
          />
        }
        // label="MUI switch"
      />
    </>
  );
}
