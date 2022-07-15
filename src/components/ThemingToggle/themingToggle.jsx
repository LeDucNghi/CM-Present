import "./themingToggle.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "constants/styledMUI";
import { postMode } from "features/slice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.app.mode);

  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (mode === "light") setIsOn(false);
    if (mode === "dark") setIsOn(true);
  }, [mode]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    console.log(
      "🚀 ~ file: themingToggle.jsx ~ line 24 ~ toggleSwitch ~ isOn",
      isOn
    );

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
            onClick={() => toggleSwitch()}
          />
        }
        // label="MUI switch"
      />
    </>
  );
}
