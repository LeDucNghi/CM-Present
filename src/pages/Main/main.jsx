import "./main.scss";

import { Navigate, Route, Routes } from "react-router-dom";
import { postDeletedList, postUserList } from "features/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllUserQuery,
  useGetDeletedUserQuery,
} from "services/userServices";

import About from "pages/About/about";
import Box from "@mui/material/Box";
import Dashboard from "pages/DashBoard/dashboard";
import Error from "components/NotFound/notFound";
import MiniDrawer from "components/Drawer/drawer";
import Projects from "pages/Projects/projects";
import Trash from "pages/Trash/trash";
import User from "pages/Users/user";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Main() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const {
    data: deletedUserList,
    error: deletedUserError,
    isLoading: deletedUserLoading,
    isSuccess: getDeletedUserSuccess,
  } = useGetDeletedUserQuery();
  const {
    data: allUserList,
    error: allUserError,
    isLoading: allUserLoading,
    isSuccess: getAllUserSuccess,
  } = useGetAllUserQuery();

  useEffect(() => {
    if (getDeletedUserSuccess && getAllUserSuccess) {
      dispatch(postUserList(allUserList));
      dispatch(postDeletedList(deletedUserList));
    }
  }, [getDeletedUserSuccess, getAllUserSuccess]);

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
          <Route path="/" element={<Navigate to="user" />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="trash"
            element={<Trash deletedUserLoading={deletedUserLoading} />}
          />

          <Route path="about/:id" element={<About />} />

          <Route path="project" element={<Projects />} />

          <Route
            path="user"
            element={
              <User
                allUserLoading={allUserLoading}
                allUserError={allUserError}
              />
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Box>
    </Box>
  );
}
