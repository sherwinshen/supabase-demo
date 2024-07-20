import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Product from "./pages/Product";
import AuthProvider from "./modules/auth/context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
          <Route index element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
