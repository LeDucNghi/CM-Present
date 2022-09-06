import { Navigate, Outlet } from "react-router-dom";

import React from "react";

export default function PrivateRoute() {
  const isLoggedIn = Boolean(localStorage.getItem("account"));

  return isLoggedIn ? <Outlet /> : <Navigate to="signin" replace={true} />;
}
