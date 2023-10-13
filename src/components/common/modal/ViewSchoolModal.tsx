import React, { useEffect } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { School } from "../../../helper/Types";
import { useSelector, useDispatch } from "react-redux";
import { getSingleSchoolAsync, getAllSchoolsAsync } from "../../../redux/reducers/schoolReducer";
import { RootState } from "../../../redux/store/rootReducer";

const ViewSchoolModal = () => {
  const { singleSchool } = useSelector((state: RootState) => state.school);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const parsedId = String(id);
    dispatch(getSingleSchoolAsync(parsedId) as never);
  }, [dispatch, id,]);

  return (
    <Container fluid className="main position-relative ">
      <Row>
        <Col sm={10} id="content" className="main textTeal">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <div className="d-table" style={{ width: "100%", height: "100vh" }}>
              <h3 className="ms-4">School Details</h3>
              {singleSchool ?
                <Container>
                  <Row className="m-4 ">
                    <Col sm={2}>
                      <div>
                        <strong>School Logo: </strong>
                        <div className="border-0">
                          <img
                            src={`${baseUrl}/${singleSchool?.schoolLogo}`}
                            alt="school logo"
                            className="img-fluid school-logo "
                          />
                        </div>
                      </div>
                    </Col>
                    <Col sm={5}>
                      <Row className="text-truncate">
                        <p>
                          <strong>School Name: </strong>{singleSchool?.schoolName}
                        </p>
                      </Row>
                      <Row >
                        <p>
                          <strong>School Affiliation: </strong>{singleSchool?.schoolAffiliation}
                        </p>
                      </Row>
                      <Row>
                        <p>
                          <strong>School Mobile Number: </strong>{singleSchool?.contactInformation}
                        </p>
                      </Row>
                      <Row>
                        <p>
                          <strong> Principle Name:</strong> {singleSchool?.principalName}
                        </p>
                      </Row>
                    </Col>
                    <Col sm={5} >
                      <Row>
                        <p>
                          <strong>School Type: </strong>{singleSchool?.schoolType}
                        </p>
                      </Row>
                      <Row className="text-truncate">
                        <p>
                          <strong>School Identification Number:</strong>{singleSchool?.schoolIdentificationNumber}
                        </p>
                      </Row>
                      <Row>
                        <p>
                          <strong>School Mail Id: </strong>{singleSchool?.schoolEmail}
                        </p>
                      </Row>
                      <Row>
                        <p>
                          <strong> Principle Contact Information:</strong> {singleSchool?.principalContactInformation}
                        </p>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <p>
                      <strong>Address:</strong> {singleSchool?.address}
                    </p>
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
                <Row>
                  <p>Loading...</p>
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
                </Row>
              }
            </div>
          </div>

        </Col>
      </Row>
    </Container>
  );
};
export default ViewSchoolModal;
