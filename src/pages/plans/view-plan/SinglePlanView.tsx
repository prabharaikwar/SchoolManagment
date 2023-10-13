import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Plan } from "../../../helper/Types";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./SinglePlanView.module.scss";
import { singlePlanAsync } from "../../../redux/reducers/planReducer"; // Import the action

const SinglePlanView = () => {
  const { singlePlan } = useSelector((state: RootState) => state.plan)
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const parsedId = String(id);
    dispatch(singlePlanAsync(parsedId) as never);
    // dispatch(all)
  }, [dispatch, id]);

  if (!singlePlan) {
    // Render loading or error state here
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="main position-relative ">
      <Row>
        <Col sm={2} bg="dark" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" className="main textTeal">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <div className="d-table" style={{ width: "100%", height: "100vh" }}>
              <h3 className="ms-4">Plan Details</h3>
              {singlePlan ?
                <Container>
                  <Row className="m-4 ">
                    <Col md={6} className="text">
                      Plan Name:<p className={styles.customColor}>{singlePlan.planName}</p>
                    </Col>
                    <Col md={6}>
                      Pricing:<p className={styles.customColor}>{singlePlan.pricing}</p>
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col md={6}>
                      Plan Duration:<p className={styles.customColor}>{singlePlan.duration}</p>
                    </Col>
                    <Col md={6}>
                      Plan Usage Limits:
                      <p className={styles.customColor}>{singlePlan.usageLimit}</p>
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col>
                      Features:
                      <p className={styles.customColor}>{singlePlan.features}</p>{" "}
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col md={6}>
                      Trial Period Limit:
                      <p className={styles.customColor}>{singlePlan.trialPeriod}</p>
                    </Col>
                    <Col md={6}>
                      Billing Cycle:{" "}
                      <p className={styles.customColor}>{singlePlan.billingCycle}</p>
                    </Col>
                  </Row>
                  <Row className="m-4">
                   <Col md={6}>
                      Plan Activation:
                      <p className={styles.customColor}>
                        {singlePlan.planActivation}
                      </p>
                    </Col>
                    <Col md={6}>
                      Plan Visibility:
                      <p className={styles.customColor}>
                        {singlePlan.planVisibility}
                      </p>
                    </Col>
                  </Row>
                  <Row className="m-4">     
                    <Col md={6}>
                      Plan Expiration:
                      <p className={styles.customColor}>
                        {singlePlan.planExpiration}
                      </p>
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col md={6}>
                      Plan Description:
                      <p className={styles.customColor}>
                        {singlePlan.planDescription}
                      </p>
                    </Col>
                    <Col md={6}>
                      Payment Gateway Option:
                      <p className={styles.customColor}>
                        {singlePlan.paymentGateway}
                      </p>
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col className="d-flex mt-5 justify-content-center">
                      <Button
                        onClick={() => {
                          navigate(-1);
                        }}
                        variant="secondary"
                      >
                        Back
                      </Button>
                    </Col>
                  </Row>
                </Container>
                :
                <p>Loading...</p>}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePlanView;
