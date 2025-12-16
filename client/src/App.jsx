import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Dashboard2FA from "./pages/Dashboard2FA";
import TwoFactorSetupPage from "./pages/TwoFactorSetupPage";
import TwoFactorPage from "./pages/TwoFactorPage";
import TwoFactorSuccessPage from "./pages/TwoFactorSuccessPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<AuthPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard2FA />} />

        {/* 2FA setup (QR screen) */}
        <Route path="/2fa/setup" element={<TwoFactorSetupPage />} />

        {/* 2FA verification during login */}
        <Route path="/2fa/verify" element={<TwoFactorPage />} />
        <Route path="/2fa/success" element={<TwoFactorSuccessPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}
