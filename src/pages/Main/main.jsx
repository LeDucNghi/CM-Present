import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { postDeletedList, postUserList } from "features/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllUserQuery,
  useGetDeletedUserQuery,
} from "services/userServices";

import About from "pages/About/about";
import Account from "pages/Account/account";
import Box from "@mui/material/Box";
import Dashboard from "pages/DashBoard/dashboard";
import Error from "components/NotFound/notFound";
import { Loading } from "components/Loading";
import MiniDrawer from "components/Drawer/drawer";
import Trash from "pages/Trash/trash";
import User from "pages/Users/user";
import { styled } from "@mui/material/styles";

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
  // const mode = localStorage.getItem("mode");
  const language = localStorage.getItem("language");

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
      className={mode}
      sx={{
        display: "flex",
        background: mode === "dark" ? "#121212" : "transparent",
        width: "100%",
        height: "100vh",
      }}
    >
      <MiniDrawer mode={mode} language={language} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Navigate to="user" />} />

          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />

          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />

          <Route
            path="trash"
            element={
              <Suspense fallback={<Loading />}>
                <Trash
                  mode={mode}
                  language={language}
                  deletedUserLoading={deletedUserLoading}
                />
              </Suspense>
            }
          />

          <Route
            path="about/:id"
            element={
              <Suspense fallback={<Loading />}>
                {/* <Profile /> */}
                <Account mode={mode} language={language} />
              </Suspense>
            }
          />

          <Route
            path="user"
            element={
              <Suspense fallback={<Loading />}>
                <User
                  mode={mode}
                  allUserLoading={allUserLoading}
                  allUserError={allUserError}
                />
              </Suspense>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Box>
    </Box>
  );
}
