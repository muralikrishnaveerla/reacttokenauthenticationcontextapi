import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Header from "./components/Header";
import Contact from "./components/Contact";
import { ContextApi } from "./components/ContextApi";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRouteProps ";
import Logout from "./components/Logout";
import ProductList from "./components/products/ProductList";
import InactivityLogout from "./components/InactivityLogout";

function App() {
  return (
    <div className="App">
      <ContextApi>
        <InactivityLogout /> Render InactivityLogout here
        <Header />
        <div style={{ margin: "20px 20px 0 20px" }}>
          <Routes>
            <Route
              path="/reacttokenauthenticationcontextapi"
              element={<Home />}
            />
            <Route
              path="/reacttokenauthenticationcontextapi/home"
              element={<Home />}
            />
            <Route
              path="/reacttokenauthenticationcontextapi/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reacttokenauthenticationcontextapi/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reacttokenauthenticationcontextapi/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reacttokenauthenticationcontextapi/login"
              element={<Login />}
            />
            <Route
              path="/reacttokenauthenticationcontextapi/logout"
              element={<Logout />}
            />
          </Routes>
        </div>
      </ContextApi>
    </div>
  );
}

export default App;
