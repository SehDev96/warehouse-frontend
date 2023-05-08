import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import TransactionPage from "./pages/shared/TransactionPage";
import WarehousePage from "./pages/shared/WarehousePage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import UserPage from "./pages/shared/UserPage";
import ProductPage from "./pages/shared/ProductPage";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/shared/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/product" element={<ProductPage />} />
        <Route path="/admin/transaction" element={<TransactionPage />} />
        <Route path="/admin/warehouse" element={<WarehousePage />} />
        <Route path="/admin/users" element={<UserPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/warehouse" element={<WarehousePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route element={<NotFoundPage />} />
        <Route path="/unauthorized" element={<UnAuthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
