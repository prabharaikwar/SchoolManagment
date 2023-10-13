import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
//routes
import {  HISTORY } from "../../helper/PageRoute";

const PlanNavbar = () => {
  return (
    <Tab.Container defaultActiveKey="Create Plans">
      <Nav>
        <Nav.Item>
          <Nav.Link
            eventKey="Plan History"
            as={Link}
            to={HISTORY}
            className="text-dark"
          >
            Plan History
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Create Plans"            
            className="bgTeal text-light" 

          >
            Create Plans
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Tab.Container>
  );
};

export default PlanNavbar;
