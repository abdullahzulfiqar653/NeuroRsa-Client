import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Encrypted from "../pages/Encrypted";
import { useAuth } from "../AuthContext";

const AppRoutes = () => {
  const { isDesktop } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/encrypted" element={<Encrypted />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
