import "./assets/styles/GlobalStyles.scss";

import { Route, Routes } from "react-router-dom";

import Error from "components/Common/NotFound/NotFound";
import Main from "components/Layouts/Main/Main";
import PrivateRoute from "components/Common/PrivateRoute/PrivateRoute";
import SignIn from "pages/SignIn/Signin";
import SignUp from "pages/SignUp/Signup";
import { useEffect } from "react";

function App() {
  const account = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (!account) return;
    else if (new Date().getTime() > account.expired) {
      localStorage.removeItem("account");
    }
  }, [account]);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="main/*" element={<Main />} />
      </Route>

      <Route index path="signin" element={<SignIn />} />
      <Route index path="signup" element={<SignUp />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
