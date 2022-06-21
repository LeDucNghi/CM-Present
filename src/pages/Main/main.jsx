import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

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
import { useGetAllUserQuery } from "services/user";
import { useSelector } from "react-redux";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const About = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("pages/About/about")), 1000);
//   });
// });

// const Trash = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("pages/Trash/trash")), 3000);
//   });
// });
// const User = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("pages/Users/user")), 3000);
//   });
// });

// const Profile = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("pages/Profile/profile")), 3000);
//   });
// });

export default function Main() {
  // const { data, error, isLoading, isSuccess } = useGetAllUserQuery();

  const mode = useSelector((state) => state.app.mode);

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
      <MiniDrawer mode={mode} />
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
                <Trash mode={mode} />
              </Suspense>
            }
          />

          <Route
            path="about/:id"
            element={
              <Suspense fallback={<Loading />}>
                {/* <Profile /> */}
                <Account mode={mode} />
              </Suspense>
            }
          />

          <Route
            path="user"
            element={
              <Suspense fallback={<Loading />}>
                <User mode={mode} />
              </Suspense>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Box>
    </Box>
  );
}
