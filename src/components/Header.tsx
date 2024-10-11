import React from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "./ContextApi";

const Header = () => {
  const { logout }: any = UseAuth();
  const auth: any = UseAuth();

  return (
    <div
      style={{ background: "#ddd" }}
      className="d-flex justify-content-between p-2"
    >
      <div>
        <ul style={{ listStyleType: "none", display: "flex", margin: 0 }}>
          <li className="me-3">
            <Link to="/reacttokenauthenticationcontextapi/home">Home</Link>
          </li>
          <li className="me-3">
            <Link to="/reacttokenauthenticationcontextapi/products">
              Products
            </Link>
          </li>
          <li className="me-3">
            <Link to="/reacttokenauthenticationcontextapi/about">About</Link>
          </li>
          <li>
            <Link to="/reacttokenauthenticationcontextapi/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul style={{ listStyleType: "none", display: "flex", margin: 0 }}>
          {auth?.accessToken ? (
            <li>
              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/reacttokenauthenticationcontextapi/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
