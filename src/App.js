import "./assets/styles/GlobalStyles.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Main from "pages/Main/main";
import SignIn from "pages/SignIn/signin";
import SignUp from "pages/SignUp/signup";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Navigate to="main" />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route index path="main/*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
