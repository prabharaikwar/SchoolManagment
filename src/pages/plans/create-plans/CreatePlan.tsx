import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
//css
import styles from "./CreatePlan.module.scss";
//modal
import PlanPreviewModal from "../../../components/common/modal/PlanPreviewModal";
import PlanNavbar from "../PlanNavbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { createPlanAsync, getCouponsAsync } from "../../../redux/reducers/planReducer";
import { RootState } from "../../../redux/store/rootReducer";
import { Plan } from "../../../helper/Types";
import { useFormik } from "formik";
import { planSchema } from "../../../helper/formValidation";
import PayPal from "../../../components/common/modal/payment-gateway/PayPal";
import CreditCard from "../../../components/common/modal/payment-gateway/CreditCard";
import UPI from "../../../components/common/modal/payment-gateway/UPI";
import OthersPayment from "../../../components/common/modal/payment-gateway/OthersPayment";
import moment from "moment";

const CreatePlan: React.FC = () => {
  const { error, coupons } = useSelector((state: RootState) => state.plan);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const initialFormData: Plan = {
    planName: "",
    planNumber: "",
    createdAt: "",
    planExpiration: "",
    usageLimit: "",
    features: "",
    trialPeriod: "",
    billingCycle: "",
    codes: "",
    planVisibility: "",
    planDescription: "",
    paymentOption: "",
    planActivation: "",
    pricing: "",
    paymentGateway: "",
    discountCouponCode: "",
    duration: "",
    planAnalytics: "",
  };

  useEffect(() => {
    dispatch(getCouponsAsync() as never);
  }, [dispatch])

  const OpenModal = () => setModalOpen(true);
  const HideModal = () => setModalOpen(false);


  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: planSchema,
    onSubmit: (values) => {
      console.log("submit");
      dispatch(createPlanAsync(values) as never);
      console.log("plan created successfully!", values);
    },
  });

  //handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <Container fluid className="main position-relative">
      <Row>
        <Col sm={2} bg="light" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" bg="dark" className="main">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <Container>
              <Row>
                <Col>
                  <PlanNavbar />
                  <Form onSubmit={formik.handleSubmit}>
                    <Card className={styles.form_plan}>
                      {/* Form Fields */}
                      <Row className="mb-3">
                        {/* Plan Name */}
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planName">Plan Name</Form.Label>
                          <Form.Control
                            id="planName"
                            type="text"
                            name="planName"
                            placeholder="Gold Plan"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planName}
                            isValid={
                              formik.touched.planName && !formik.errors.planName
                            }
                            isInvalid={
                              formik.touched.planName && !!formik.errors.planName
                            }
                          />
                          {formik.touched.planName && formik.errors.planName && (
                            <div className="text-danger">{formik.errors.planName}</div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="pricing">Pricing</Form.Label>
                          <Form.Control
                            id="pricing"
                            type="number"
                            name="pricing"
                            className="form-control"
                            placeholder="$000"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pricing}
                            isValid={
                              formik.touched.pricing && !formik.errors.pricing
                            }
                            isInvalid={
                              formik.touched.pricing && !!formik.errors.pricing
                            }
                          />
                          {formik.touched.pricing && formik.errors.pricing && (
                            <div className="text-danger">{formik.errors.pricing}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="duration">Plan Duration</Form.Label>
                          <Form.Control
                            id="duration"
                            type="number"
                            name="duration"
                            className="form-control"
                            placeholder="Ex. 1 year"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration}
                            isValid={
                              formik.touched.duration && !formik.errors.duration
                            }
                            isInvalid={
                              formik.touched.duration && !!formik.errors.duration
                            }
                          />
                          {formik.touched.duration && formik.errors.duration && (
                            <div className="text-danger">{formik.errors.duration}</div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="usageLimit">Plan Usage Limits</Form.Label>
                          <Form.Control
                            id="usageLimit"
                            type="number"
                            name="usageLimit"
                            className="form-control"
                            placeholder="Max 5000 student"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.usageLimit}
                            isValid={
                              formik.touched.usageLimit && !formik.errors.usageLimit
                            }
                            isInvalid={
                              formik.touched.usageLimit && !!formik.errors.usageLimit
                            }
                          />
                          {formik.touched.usageLimit && formik.errors.usageLimit && (
                            <div className="text-danger">{formik.errors.usageLimit}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="features">Features</Form.Label>
                          <Form.Control
                            id="features"
                            type="text"
                            name="features"
                            as="textarea"
                            rows={3}
                            className="form-control"
                            placeholder="Ex.
                               1. Analytics and Insights:Provide data analytics and insights into student and teacher performance.
                               2.Attendance Tracking: Track and manage student attendance records.
                               3.Course Management: Create, organize, and manage courses and class schedules."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.features}
                            isValid={
                              formik.touched.features && !formik.errors.features
                            }
                            isInvalid={
                              formik.touched.features && !!formik.errors.features
                            }
                          />
                          {formik.touched.features && formik.errors.features && (
                            <div className="text-danger">{formik.errors.features}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="billingCycle">Billing Cycle</Form.Label>
                          <Form.Control
                            id="billingCycle"
                            as="select"
                            name="billingCycle"
                            className="form-select"
                            aria-label="Billing Cycle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.billingCycle}
                            isValid={
                              formik.touched.billingCycle && !formik.errors.billingCycle
                            }
                            isInvalid={
                              formik.touched.billingCycle && !!formik.errors.billingCycle}
                          >
                            <option value="">Select</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="semiannually">Semi-Annually</option>
                            <option value="annually">Annually</option>
                          </Form.Control>
                          {formik.touched.billingCycle && formik.errors.billingCycle && (
                            <div className="text-danger">{formik.errors.billingCycle}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="discountCouponCode">Discount/Coupon codes(Optional)</Form.Label>
                          <Form.Control
                            id="discountCouponCode"
                            as="select"
                            name="discountCouponCode"
                            className="form-control"
                          >
                            <option value="">Select a Coupon</option>
                            {coupons &&
                              coupons.map((item, index) => {
                                const formattedDate = moment(item.validFrom || item.validTo).format('MMMM Do YYYY, h:mm:ss a');
                                return (
                                  <option key={item._id} value={index}>
                                    {item.code} - {item.discountAmount}% - Expires: {formattedDate}
                                  </option>
                                )
                              })}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planVisibility">Plan Visibility</Form.Label>
                          <Form.Control
                            id="planVisibility"
                            as="select"
                            name="planVisibility"
                            className="form-select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planVisibility}
                            isValid={
                              formik.touched.planVisibility && !formik.errors.planVisibility
                            }
                            isInvalid={
                              formik.touched.planVisibility && !!formik.errors.planVisibility
                            }
                          >
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                          </Form.Control>
                          {formik.touched.planVisibility && formik.errors.planVisibility && (
                            <div className="text-danger">{formik.errors.planVisibility}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planActivation">Plan Activation</Form.Label>
                          <Form.Control
                            id="planActivation"
                            type="text"
                            name="planActivation"
                            className="form-control"
                            placeholder="Plan becomes active after purchase or after 7 days"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planActivation}
                            isValid={
                              formik.touched.planActivation && !formik.errors.planActivation
                            }
                            isInvalid={
                              formik.touched.planActivation && !!formik.errors.planActivation
                            }
                          />
                          {formik.touched.planActivation && formik.errors.planActivation && (
                            <div className="text-danger">{formik.errors.planActivation}</div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planAnalytics">Plan Analytics</Form.Label>
                          <Form.Control
                            id="planAnalytics"
                            type="text"
                            name="planAnalytics"
                            className="form-control"
                            placeholder="Ex. No. of users"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planAnalytics}
                            isValid={
                              formik.touched.planAnalytics && !formik.errors.planAnalytics
                            }
                            isInvalid={
                              formik.touched.planAnalytics && !!formik.errors.planAnalytics
                            }
                          />
                          {formik.touched.planAnalytics && formik.errors.planAnalytics && (
                            <div className="text-danger">{formik.errors.planAnalytics}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planExpiration">Plan Expiration</Form.Label>
                          <Form.Control
                            id="planExpiration"
                            type="number"
                            name="planExpiration"
                            className="form-control"
                            placeholder="01/01/2024"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planExpiration}
                            isValid={
                              formik.touched.planExpiration && !formik.errors.planExpiration
                            }
                            isInvalid={
                              formik.touched.planExpiration && !!formik.errors.planExpiration
                            }
                          />
                          {formik.touched.planExpiration && formik.errors.planExpiration && (
                            <div className="text-danger">{formik.errors.planExpiration}</div>
                          )}
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="trialPeriod">Trial Period</Form.Label>
                          <Form.Control
                            id="trialPeriod"
                            type="text"
                            // type="number"
                            name="trialPeriod"
                            className="form-control"
                            placeholder="7 Days"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.trialPeriod}
                            isValid={
                              formik.touched.trialPeriod && !formik.errors.trialPeriod
                            }
                            isInvalid={
                              formik.touched.trialPeriod && !!formik.errors.trialPeriod
                            }
                          />
                          {formik.touched.trialPeriod && formik.errors.trialPeriod && (
                            <div className="text-danger">{formik.errors.trialPeriod}</div>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label htmlFor="planDescription">Plan Description</Form.Label>
                          <Form.Control
                            id="planDescription"
                            as="textarea"
                            name="planDescription"
                            className="form-control" //
                            placeholder="Our Pro Plan is perfect for larger educational institutions with advanced needs."
                            rows={3}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.planDescription}
                            isValid={
                              formik.touched.planDescription && !formik.errors.planDescription
                            }
                            isInvalid={
                              formik.touched.planDescription && !!formik.errors.planDescription
                            }
                          />
                          {formik.touched.planDescription && formik.errors.planDescription && (
                            <div className="text-danger">{formik.errors.planDescription}</div>
                          )}
                        </Form.Group>
                      </Row>

                      {/* payment method */}
                      <Row className="mb-3">
                        <Form.Group controlId="paymentMethod">
                          <Form.Label>Payment Method</Form.Label>
                          {/* Radio buttons for payment method selection */}                         
                            <div className="d-flex justify-content-between w-50">
                              <label>
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentGateway"
                                  value="Credit Card"
                                  onClick={() => handlePaymentMethodChange("Credit Card")}
                                />
                                <span className="m-1">
                                  Credit Card
                                </span>
                              </label>
                              <label>
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentGateway"
                                  value="PayPal"
                                  onClick={() => handlePaymentMethodChange("PayPal")}
                                />
                                <span className="m-1">PayPal</span>
                              </label>
                              <label>
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentGateway"
                                  value="UPI"
                                  onClick={() => handlePaymentMethodChange("UPI")}
                                />
                                <span className="m-1">
                                  UPI
                                </span>
                              </label>
                              <label>
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentGateway"
                                  value="other"
                                  onClick={() => handlePaymentMethodChange("Other")}
                                  className=""
                                />
                                <span className="m-1">
                                  Other
                                </span>
                              </label>
                            </div>
                            {formik.touched.paymentGateway && formik.errors.paymentGateway && (
                              <div className="text-danger">{formik.errors.paymentGateway}</div>
                            )}
                    
                        </Form.Group>
                      </Row>
                      {selectedPaymentMethod === "Credit Card" && (
                        <CreditCard />
                      )}
                      {selectedPaymentMethod === "PayPal" && (
                        <PayPal />
                      )}
                      {selectedPaymentMethod === "UPI" && (
                        <UPI />
                      )}
                      {selectedPaymentMethod === "Other" && (
                        <OthersPayment />
                      )}

                      {/* buttons */}
                      <Row className="mb-3">
                        <div className="d-flex justify-content-between">
                          <Button
                            type="button"
                            variant="primary"
                            className="rounded-pill"
                            onClick={OpenModal}
                          >
                            Plan Preview
                          </Button>
                          <PlanPreviewModal
                            modalOpen={modalOpen}
                            Hide={HideModal}
                            formData={formik.values}
                          />
                          <div className="d-flex">
                            <Button
                              type="button"
                              className="plan_btn me-2 rounded-pill"
                              variant="success"
                            >
                              Create Plan
                            </Button>
                            <Button
                              type="button"

                              className="btn-rounded ms-2 rounded-pill"
                              variant="secondary"
                              onClick={() => {
                                formik.resetForm();
                              }}
                            >
                              Clear/Reset
                            </Button>
                          </div>
                        </div>
                      </Row>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePlan;
