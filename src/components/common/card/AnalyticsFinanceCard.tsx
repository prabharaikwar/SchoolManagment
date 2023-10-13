import React from "react";
import { Card, Row, Col } from "react-bootstrap";

interface DashboardCardProps {
  heading: string;
  content?: React.ReactNode;
  search?: React.ReactNode;
  total?: number;
  filter?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  heading,
  search,
  content,
  total,
  filter,
}) => {
  return (
    <Card className="text-dark h-100">
      <div className="px-2">
        <Card.Header>
          <Row className="d-flex text-truncate align-items-center ">
            <Col sm={6} >
              <h6>{heading}</h6>
            </Col>
            <Col sm={6}>
              <div
                className="d-flex"
                style={{ width: "100%", justifyContent: "space-evenly" }}
              >
                {search}
                {filter}
              </div>
            </Col>
          </Row>
          <div>{total}</div>
        </Card.Header>
        <Card.Body style={{ maxHeight: "150px", overflowY: "auto" }}>
          {content}
        </Card.Body>
        <div className="line" />
      </div>
    </Card>
  );
};

export default DashboardCard;
