import React from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "./ContextApi";

const Header = () => {
  const { logout }: any = UseAuth();
  const auth: any = UseAuth();
  const Alert = () => {
    alert("Please Login");
  };
  return (
    <div className="d-flex justify-content-between p-2 bg-dark">
      <div>
        <ul style={{ listStyleType: "none", display: "flex", margin: 0 }}>
          <li className="me-3">
            <Link
              to="/reacttokenauthenticationcontextapi/home"
              className="text-white fw-medium"
            >
              Home
            </Link>
          </li>
          <li className="me-3">
            {auth?.accessToken ? (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/products"
              >
                Products
              </Link>
            ) : (
              <Link
                to="/reacttokenauthenticationcontextapi/login"
                onClick={() => Alert()}
                className="text-white fw-medium"
              >
                Products
              </Link>
            )}
          </li>
          <li className="me-3">
            {auth?.accessToken ? (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/productstable"
              >
                Products Table
              </Link>
            ) : (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/login"
                onClick={() => Alert()}
              >
                Products Table
              </Link>
            )}
          </li>
          <li className="me-3">
            {auth?.accessToken ? (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/todo"
              >
                Todo List
              </Link>
            ) : (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/login"
                onClick={() => Alert()}
              >
                Todo List
              </Link>
            )}
          </li>
          <li>
            {auth?.accessToken ? (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/about"
              >
                About
              </Link>
            ) : (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/login"
                onClick={() => Alert()}
              >
                About
              </Link>
            )}
          </li>
          <li>
            {auth?.accessToken ? (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/contact"
              >
                Contact
              </Link>
            ) : (
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/login"
                onClick={() => Alert()}
              >
                Contact
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div>
        <ul style={{ listStyleType: "none", display: "flex", margin: 0 }}>
          {auth?.accessToken ? (
            <li>
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi"
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link
                className="text-white fw-medium"
                to="/reacttokenauthenticationcontextapi/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
