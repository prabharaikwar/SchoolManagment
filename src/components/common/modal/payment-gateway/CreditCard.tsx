import React from "react";
import { Card, Form, Button,Row,Col,Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreditCardForm = () => {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvvNumber: "",
      billingAddress: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
      cardHolderName: Yup.string().required("Cardholder name is required"),
      expiryDate: Yup.string()
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date format must be MM/YY"),
      cvvNumber: Yup.string()
        .required("CVV number is required")
        .matches(/^\d{3}$/, "CVV must be 3 digits"),
      billingAddress: Yup.string().required("Billing address is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Card className="w-50 mb-2">
      <Card.Header>Enter Credit Card Details</Card.Header>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>       
          <Form.Group controlId="cardHolderName">
            <Form.Label>Cardholder Name:</Form.Label>
            <Form.Control
              type="text"
              name="cardHolderName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardHolderName}
              isValid={
                formik.touched.cardHolderName && !formik.errors.cardHolderName
              }
              isInvalid={
                formik.touched.cardHolderName && !!formik.errors.cardHolderName
              }
            />
            {formik.touched.cardHolderName && formik.errors.cardHolderName && (
              <div className="text-danger">{formik.errors.cardHolderName}</div>
            )}
          </Form.Group>
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number:</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber}
              isValid={formik.touched.cardNumber && !formik.errors.cardNumber}
              isInvalid={formik.touched.cardNumber && !!formik.errors.cardNumber}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <div className="text-danger">{formik.errors.cardNumber}</div>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="expiryDate">
                <Form.Label>MM/YY (Expiry Date):</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                  isValid={formik.touched.expiryDate && !formik.errors.expiryDate}
                  isInvalid={formik.touched.expiryDate && !!formik.errors.expiryDate}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <div className="text-danger">{formik.errors.expiryDate}</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cvvNumber">
                <Form.Label>CVV Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="cvvNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvvNumber}
                  isValid={formik.touched.cvvNumber && !formik.errors.cvvNumber}
                  isInvalid={formik.touched.cvvNumber && !!formik.errors.cvvNumber}
                />
                {formik.touched.cvvNumber && formik.errors.cvvNumber && (
                  <div className="text-danger">{formik.errors.cvvNumber}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="billingAddress">
            <Form.Label>Billing Address:</Form.Label>
            <Form.Control
              type="text"
              name="billingAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billingAddress}
              isValid={
                formik.touched.billingAddress && !formik.errors.billingAddress
              }
              isInvalid={
                formik.touched.billingAddress && !!formik.errors.billingAddress
              }
            />
            {formik.touched.billingAddress && formik.errors.billingAddress && (
              <div className="text-danger">{formik.errors.billingAddress}</div>
            )}
          </Form.Group>
          <Button type="submit" variant="secondary" className="mt-2 rounded-5">
            Submit Payment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreditCardForm;
