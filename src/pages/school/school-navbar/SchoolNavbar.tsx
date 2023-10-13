import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
//routes
import {All_SCHOOL } from "../../../helper/PageRoute";

const SchoolNavbar = () => {
  return (
    <Tab.Container defaultActiveKey="Create Plans p-4">
      <Nav>
        <Nav.Item>
          <Nav.Link
            eventKey="Plan History"
            as={Link}
            to={All_SCHOOL}
            className="text-dark"
          >
            All School List
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Create Plans"
            // as={Link}
            // to={ADD_SCHOOL}
            className="bgTeal text-light" 
          >
            Add School
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Tab.Container>
  );
};

export default SchoolNavbar;
