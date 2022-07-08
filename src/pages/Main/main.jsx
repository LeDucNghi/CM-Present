import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
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
import { Loading } from "components/Loading";
import MiniDrawer from "components/Drawer/drawer";
import Trash from "pages/Trash/trash";
import User from "pages/Users/user";
import { styled } from "@mui/material/styles";
import { userData } from "constants/global";

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

  const chartData = {
    labels: userData.map((data) => data.year),
    datasets: [
      {
        label: "User Register",
        data: userData.map((data) => data.userRegister),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

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
        width: "100%",
        height: "100vh",
      }}
    >
      <MiniDrawer mode={mode} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Navigate to="user" />} />

          <Route
            path="dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard languages={languages} chartData={chartData} />
              </Suspense>
            }
          />

          <Route
            path="trash"
            element={
              <Suspense fallback={<Loading />}>
                <Trash
                  mode={mode}
                  languages={languages}
                  deletedUserLoading={deletedUserLoading}
                />
              </Suspense>
            }
          />

          <Route
            path="about/:id"
            element={
              <Suspense fallback={<Loading />}>
                <About mode={mode} languages={languages} />
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
                  languages={languages}
                />
              </Suspense>
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
