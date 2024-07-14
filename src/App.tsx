import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import AuthAccess from "./pages/login/AuthAccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthAccess />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
