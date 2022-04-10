import React from "react";
import { Link } from "react-router-dom";
import UserStatus from "./UserStatus";

const NavBar = () => {
  const navBarStyle = {
    // marginLeft: "auto",
    // marginRight: "auto",
    // marginBottom: "10px",
    position: "sticky",
    alignItems: "center",
    justifyContent: "center",
    top: "0px",
    display: "flex",
  };

  const rightNavStyle = {
    width: " 50%",
    textAlign: "right",
  };

  return (
    <nav style={navBarStyle}>
      <ul style={{ width: "50%" }}>
        <Link style={{ padding: "10px" }} to="/">
          blogs
        </Link>
        <Link style={{ padding: "10px" }} to="/users">
          users
        </Link>
        <Link style={{ padding: "10px" }} to="/login">
          login
        </Link>
      </ul>
      <div style={rightNavStyle}>
        <UserStatus />
      </div>
      {/* <UserStatus/> */}
    </nav>
  );
};

export default NavBar;
