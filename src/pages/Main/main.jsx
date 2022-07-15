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
    <Box className={mode}>
      <MiniDrawer mode={mode} languages={languages} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Navigate to="user" />} />

          <Route
            path="dashboard"
            element={<Dashboard mode={mode} languages={languages} />}
          />

          <Route
            path="trash"
            element={
              <Trash
                mode={mode}
                languages={languages}
                deletedUserLoading={deletedUserLoading}
              />
            }
          />

          <Route
            path="about/:id"
            element={<About mode={mode} languages={languages} />}
          />

          <Route
            path="project"
            element={<Projects mode={mode} languages={languages} />}
          />

          <Route
            path="user"
            element={
              <User
                mode={mode}
                allUserLoading={allUserLoading}
                allUserError={allUserError}
                languages={languages}
              />
            }
          />

          <Route
            path="*"
            element={<Error mode={mode} languages={languages} />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
