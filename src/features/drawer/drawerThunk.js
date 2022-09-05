import { postLanguage, postMode } from "./drawerSlice";

export const toggleSwitch = (isOn, setIsOn) => (dispatch, getState) => {
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

export const handleChangeLanguage =
  (id, setLanguage, setAnchorEl) => (dispatch, getState) => {
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
