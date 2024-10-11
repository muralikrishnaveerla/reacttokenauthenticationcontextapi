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

function App() {
  return (
    <div className="App">
      <ContextApi>
        <Header />
        <div style={{ margin: "20px 20px 0 20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </ContextApi>
    </div>
  );
}

export default App;
