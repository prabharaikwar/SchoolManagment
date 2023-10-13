import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import phonepe from "../../../../assets/images/phonepe.png";
import gpay from "../../../../assets/images/gpay.png";
import Bhim from "../../../../assets/images/Bhim.png";
import paytm from "../../../../assets/images/paytm.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const UPI = () => {
  const formik = useFormik({
    initialValues: {
      upiId: "",
      selectedApp: "",
    },
    validationSchema: Yup.object({
      upiId: Yup.string()
        .required("UPI ID is required")
        .matches(/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid UPI ID"),
      selectedApp: Yup.string().required("Select a UPI app"),
    }),
    onSubmit: (values) => {      
      alert("Payment request submitted successfully!");
    },
  });

  return (
    <Card className="w-50 text-center mb-2">
      <Card.Header>UPI Payment</Card.Header>
      <Container className="p-2">
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="upiId">
              <Form.Label>UPI ID:</Form.Label>
              <Form.Control
                type="text"
                name="upiId"
                placeholder="Enter your UPI ID"
                className="rounded-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.upiId}
                isValid={formik.touched.upiId && !formik.errors.upiId}
                isInvalid={formik.touched.upiId && !!formik.errors.upiId}
              />
              {formik.touched.upiId && formik.errors.upiId && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.upiId}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="selectedApp">
              <Form.Label>Select UPI App:</Form.Label>
              <Form.Control
                as="select"
                name="selectedApp"
                className="rounded-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.selectedApp}
                isValid={formik.touched.selectedApp && !formik.errors.selectedApp}
                isInvalid={formik.touched.selectedApp && !!formik.errors.selectedApp}
              >
                <option value="">Select UPI App</option>
                <option value="BHIM">BHIM</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Paytm">Paytm</option>
                <option value="Gpay">Gpay</option>
              </Form.Control>
              {formik.touched.selectedApp && formik.errors.selectedApp && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.selectedApp}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button type="submit" variant="secondary" className="rounded-5 mt-2">
                Submit Payment
              </Button>
            </Col>
          </Row>
        </Form>
        {/* Instructions */}
        <p className="text-muted">
          Please enter your UPI ID and select your preferred UPI app to proceed with the payment.
        </p>
        {/* Icons */}
        <Row>
          <Col>
          <img
            src={Bhim} 
            alt="BHIM"
            className="img-fluid w-50 h-50"
          />
          </Col>
          <Col>
          <img
            src={phonepe}
            alt="PhonePe"
            className="img-fluid w-50 h-50"
          />
          </Col>
          <Col>
          <img
            src={paytm}
            alt="Paytm"
            className="img-fluid w-50 h-50"
          />
          </Col>
          <Col>
          <img
            src={gpay}
            alt="Gpay"
            className="img-fluid w-50 h-50"
          />
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default UPI;
