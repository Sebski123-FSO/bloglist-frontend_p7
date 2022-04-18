import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserStatus from "./UserStatus";

const NavigationBar = () => {
  // const navBarStyle = {
  //   backgroundColor: "lightblue",
  //   // height: "30px",
  //   position: "sticky",
  //   // alignItems: "center",
  //   // justifyContent: "center",
  //   // top: "0px",
  //   // display: "flex",
  // };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <UserStatus />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
