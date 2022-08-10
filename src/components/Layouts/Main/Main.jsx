import "./Main.scss";

import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import About from "pages/About/About";
import Box from "@mui/material/Box";
import Dashboard from "pages/DashBoard/Dashboard";
import { DrawerHeader } from "constants/styledMUI";
import Error from "components/Common/NotFound/NotFound";
import MiniDrawer from "features/drawer/components/Drawer";
import Projects from "pages/Projects/Projects";
import Trash from "pages/Trash/Trash";
import User from "pages/Users/User";
import { postDeletedList } from "features/trash/trashSlice";
import { postUserList } from "features/user/userSlice";
import { selectMode } from "features/drawer/drawerSlice";
import { useEffect } from "react";

export default function Main() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  useEffect(() => {
    dispatch(postUserList());
    dispatch(postDeletedList());
  }, [dispatch]);

  return (
    <Box
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
      className={mode}
    >
      <MiniDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Navigate to="user" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="trash" element={<Trash />} />

          <Route path="about/:id" element={<About />} />

          <Route path="project" element={<Projects />} />

          <Route path="user" element={<User />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Box>
    </Box>
  );
}
