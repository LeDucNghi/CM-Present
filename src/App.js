import "./assets/styles/GlobalStyles.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import { Loading } from "components/Loading";
import Main from "pages/Main/main";
import SignIn from "pages/SignIn/signin";
import SignUp from "pages/SignUp/signup";

// const Home = React.lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("pages/Main/main")), 1000);
//   });
// });

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Navigate to="home" />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route
          index
          path="home/*"
          element={
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
