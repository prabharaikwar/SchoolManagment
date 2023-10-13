import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const OthersPayment = () => {
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      ifscCode: "",
      amountExpected: "",
      beneficiaryName: "",
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required("Account number is required"),
      ifscCode: Yup.string().required("IFSC code is required"),
      amountExpected: Yup.number()
        .required("Amount expected is required")
        .min(1, "Amount must be at least 1"),
      beneficiaryName: Yup.string().required("Beneficiary name is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Card className="w-50 text-center mb-2">
      <Card.Header>Other Payment Method</Card.Header>
      <Container className="p-2">
        <p>To complete the transaction, provide the following details:</p>
        <Card>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3 p-2">
              <Form.Group as={Col} controlId="accountNumber">
                <Form.Label>Account Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="accountNumber"
                  placeholder="Enter account number"
                  className="rounded-5 "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountNumber}
                  isValid={
                    formik.touched.accountNumber && !formik.errors.accountNumber
                  }
                  isInvalid={
                    formik.touched.accountNumber && !!formik.errors.accountNumber
                  }
                />
                {formik.touched.accountNumber && formik.errors.accountNumber && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.accountNumber}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3 p-2">
              <Form.Group as={Col} controlId="ifscCode">
                <Form.Label>IFSC Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="ifscCode"
                  placeholder="Enter IFSC code"
                  className="rounded-5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ifscCode}
                  isValid={formik.touched.ifscCode && !formik.errors.ifscCode}
                  isInvalid={formik.touched.ifscCode && !!formik.errors.ifscCode}
                />
                {formik.touched.ifscCode && formik.errors.ifscCode && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.ifscCode}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3 p-2">
              <Form.Group as={Col} controlId="amountExpected">
                <Form.Label>Amount Expected:</Form.Label>
                <Form.Control
                  type="number"
                  name="amountExpected"
                  placeholder="Enter amount"
                  className="rounded-5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amountExpected}
                  isValid={
                    formik.touched.amountExpected &&
                    !formik.errors.amountExpected
                  }
                  isInvalid={
                    formik.touched.amountExpected &&
                    !!formik.errors.amountExpected
                  }
                />
                {formik.touched.amountExpected &&
                  formik.errors.amountExpected && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.amountExpected}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
            </Row>
            <Row className="mb-3 p-2">
              <Form.Group as={Col} controlId="beneficiaryName">
                <Form.Label>Beneficiary Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="beneficiaryName"
                  placeholder="Enter beneficiary name"
                  className="rounded-5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.beneficiaryName}
                  isValid={
                    formik.touched.beneficiaryName &&
                    !formik.errors.beneficiaryName
                  }
                  isInvalid={
                    formik.touched.beneficiaryName &&
                    !!formik.errors.beneficiaryName
                  }
                />
                {formik.touched.beneficiaryName &&
                  formik.errors.beneficiaryName && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.beneficiaryName}
                    </Form.Control.Feedback>
                  )}
              </Form.Group>
            </Row>
            <Row className="mb-3 p-2 ">
              <Col>
                <Button
                  type="submit"
                  variant="secondary"
                  className="rounded-5 mt-2"
                >
                  Submit Payment
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </Card>
  )
}

export default OthersPayment;



