import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminHomePage from "./pages/admin/AdminHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
