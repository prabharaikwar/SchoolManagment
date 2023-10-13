import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const PayPal = () => {
  const formik = useFormik({
    initialValues: {
      paypalEmail: "",
      paypalPassword: "",
    },
    validationSchema: Yup.object({
      paypalEmail: Yup.string()
        .email("Invalid email address")
        .required("PayPal Email is required"),
      paypalPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Card className="w-50 text-center mb-2">
      <Card.Header>PayPal Payment</Card.Header>
      <Container className="p-2">
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="paypalEmail">
              <Form.Label>PayPal Email:</Form.Label>
              <Form.Control
                type="email"
                name="paypalEmail"
                className="rounded-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paypalEmail}
                isValid={
                  formik.touched.paypalEmail && !formik.errors.paypalEmail
                }
                isInvalid={
                  formik.touched.paypalEmail && !!formik.errors.paypalEmail
                }
              />
              {formik.touched.paypalEmail && formik.errors.paypalEmail && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.paypalEmail}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="paypalPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="paypalPassword"
                className="rounded-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paypalPassword}
                isValid={
                  formik.touched.paypalPassword && !formik.errors.paypalPassword
                }
                isInvalid={
                  formik.touched.paypalPassword && !!formik.errors.paypalPassword
                }
              />
              {formik.touched.paypalPassword && formik.errors.paypalPassword && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.paypalPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button type="submit" className="rounded-5 mt-2">
                Submit Payment
              </Button>
            </Col>
          </Row>
        </Form>
        <Card.Footer>
          <p>Powered By Paypal</p>
        </Card.Footer>
      </Container>
    </Card>
  );
};

export default PayPal;
