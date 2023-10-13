import React,{useEffect} from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singlePlanAsync } from "../../../redux/reducers/planReducer"; // Adjust the import path as needed
import { RootState } from "../../../redux/store/rootReducer"; 
import { Plan } from "../../../helper/Types";

interface ModalProps {
  modalOpen: boolean;
  Hide: () => void;
  formData: Partial<Plan>;
}

const PlanPreviewModal: React.FC<ModalProps> = ({ modalOpen, Hide,formData  }) => {
  return (
    <Modal show={modalOpen} onHide={Hide}>
      <Modal.Header closeButton>
        <Modal.Title>Plan Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="m-4 ">
            <Col md={6} className="text">
              <p>                
                <strong>Plan Name: </strong>{formData.planName}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Pricing: </strong>{formData.pricing}
              </p>
            </Col>
          </Row>
          <Row className="m-4">
            <Col md={6}>
              <p>
                <strong>Plan Duration: </strong>{formData.duration}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Plan Usage Limits: </strong>{formData.usageLimit}
              </p>
            </Col>
          </Row>
          <Row className="m-4">
            <Col>
              <strong>Features:</strong>
              <p>
               {formData.features}
              </p>
            </Col>
          </Row>
          <Row className="m-4">
            <Col md={6}>
              <p>
                <strong>Trial Period Limit: </strong>{formData.trialPeriod}
              </p>
            </Col>
            <Col md={6}>
              <p>                
                <strong>Billing Cycle: </strong>{formData.billingCycle}
              </p>
            </Col>
          </Row>
          <Row className="m-4">
            <Col md={6}>
              <p>
                <strong> Discount/Coupon Codes:</strong> {formData.discountCouponCode}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Plan Visibility:</strong>{formData.planActivation}
              </p>
            </Col>
          </Row>
          <Row className="m-4">
            <Col md={6}>
              <p>
                <strong>Plan Description:</strong>{formData.planDescription}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Payment Gateway Option:</strong>{formData.paymentGateway}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={Hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanPreviewModal;
