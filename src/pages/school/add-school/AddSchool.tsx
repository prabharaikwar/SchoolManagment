import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form as BootstrapForm,
  Button,
  Figure,
} from "react-bootstrap";
//redux
import { useDispatch, useSelector } from "react-redux";
//reducer
import { addSchoolAsync, fetchPlanSelectionAsync } from "../../../redux/reducers/schoolReducer";
//Formik validation
import { useFormik ,FormikProvider} from 'formik';
//validation
import { validateSchema } from "../../../helper/formValidation";
//css
import styles from "./AddSchool.module.scss";
import SchoolNavbar from "../school-navbar/SchoolNavbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { RootState } from "../../../redux/store/rootReducer";
import { School } from "../../../helper/Types";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import axios from "axios";

const AddSchool = () => {
  const { planSelection } = useSelector((state: RootState) => state.school);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const token = localStorage.getItem("token");
  const headers = {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  const apiUrl = process.env.REACT_APP_BASE_URL;
  

  useEffect(() => {
    dispatch(fetchPlanSelectionAsync() as never);
  }, [dispatch])

  const [formData, setFormData] = useState<School>({
    _id: "",
    schoolLogo: "",
    schoolName: "",
    schoolAffiliation: "",
    contactInformation: 0,
    principalName: "",
    schoolType: "",
    schoolIdentificationNumber: "",
    schoolEmail: "",
    principalContactInformation: "",
    address: "",
    schoolCity: "",
    schoolPinCode: "",
    userName: "",
    createPassword: "",
    confirmPassword: "",
    termsAndConditions: false,
    discountCouponCode: "",
    planSelection: "",
    schoolWebsite: "",
  });
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        console.log('Form submitted with values:', values);
               await axios.post(`${apiUrl}/school`, values,{headers});    
      } catch (error) {    
        console.error('Error:', error);   
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
    console.log("called");
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
                  <Card className="m-3">
                    <SchoolNavbar />
                    <FormikProvider value={formik}>
                    <BootstrapForm className={styles.formPlan} onSubmit={handleSubmit}>
                      <Card className="mb-2 p-3">
                        <Row className="mb-3">
                          <h5>School Details</h5>
                          <Col sm={3}>
                            <div className="">
                              <div
                                className="bg-light img-fluid mb-1 text-center"
                                style={{ height: "150px", width: "150px" }}
                              >
                                {selectedImage ? (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="school logo"
                                    className="img-fluid school-logo"
                                  />
                                ) : (
                                  <div className="empty-box"></div>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                id="schoolLogo"
                                name="schoolLogo"
                                onChange={(e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const file = files[0];
                                    formik.setFieldValue("schoolLogo", file);
                                    setSelectedImage(file); 
                                  }
                                }}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.schoolLogo && formik.errors.schoolLogo && (
                                <ErrorMessage error={formik.errors.schoolLogo} />
                              )}
                            </div>
                          </Col>
                          <Col sm={9}>
                            <Row>
                              <Col sm={6}>
                                <BootstrapForm.Label htmlFor="schoolName">
                                  School Name
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  id="schoolName"
                                  name="schoolName"
                                  placeholder="St. Mary H.S. School"
                                  value={formik.values.schoolName}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.schoolName && formik.errors.schoolName && (
                                  <ErrorMessage error={formik.errors.schoolName} />
                                )}
                              </Col>
                              <Col sm={6}>
                                <BootstrapForm.Label htmlFor="schoolType">
                                  School Type
                                </BootstrapForm.Label>
                                <BootstrapForm.Select
                                  id="schoolType"
                                  name="schoolType"
                                  value={formik.values.schoolType}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select School Type</option>
                                  <option>Government</option>
                                  <option>Private</option>
                                </BootstrapForm.Select>
                                {formik.touched.schoolType && formik.errors.schoolType && (
                                  <ErrorMessage error={formik.errors.schoolType} />
                                )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="schoolAffiliation">
                                  School Affiliation
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  placeholder="Affiliation with educational boards or bodies"
                                  id="schoolAffiliation"
                                  name="schoolAffiliation"
                                  value={formik.values.schoolAffiliation}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.schoolAffiliation && formik.errors.schoolAffiliation && (
                                  <ErrorMessage error={formik.errors.schoolAffiliation} />
                                )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="schoolIdentificationNumber">
                                  School Identification Number
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text" // Use type "text" since Yup validation allows strings
                                  placeholder="01234567890"
                                  id="schoolIdentificationNumber"
                                  name="schoolIdentificationNumber"
                                  value={formik.values.schoolIdentificationNumber}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.schoolIdentificationNumber && formik.errors.schoolIdentificationNumber && (
                                  <ErrorMessage error={formik.errors.schoolIdentificationNumber} />
                                )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="contactInformation">
                                  School Mobile Number
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text" // Use type "text" since Yup validation allows strings
                                  placeholder="+91-1234567890"
                                  id="contactInformation"
                                  name="contactInformation"
                                  value={formik.values.contactInformation}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.contactInformation && formik.errors.contactInformation && (
                                  <ErrorMessage error={formik.errors.contactInformation} />
                                )}

                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="schoolEmail">
                                  School Mail Id
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  placeholder="Schoolmailid@gmail.com"
                                  id="schoolEmail"
                                  name="schoolEmail"
                                  value={formik.values.schoolEmail}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.schoolEmail && formik.errors.schoolEmail && (
                                  <ErrorMessage error={formik.errors.schoolEmail} />
                                )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="principalName">
                                  Principal Name
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  placeholder="School Principal Name"
                                  id="principalName"
                                  name="principalName"
                                  value={formik.values.principalName}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.principalName && formik.errors.principalName && (
                                  <ErrorMessage error={formik.errors.principalName} />
                                )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="principalContactInformation">
                                  Principal Contact Information
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="email"
                                  placeholder="contactInformation@gmail.com"
                                  id="principalContactInformation"
                                  name="principalContactInformation"
                                  value={formik.values.principalContactInformation}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.principalContactInformation &&
                                  formik.errors.principalContactInformation && (
                                    <ErrorMessage error={formik.errors.principalContactInformation} />
                                  )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="schoolWebsite">
                                  School Website
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  placeholder="School Website"
                                  id="schoolWebsite"
                                  name="schoolWebsite"
                                  value={formik.values.schoolWebsite}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.schoolWebsite &&
                                  formik.errors.schoolWebsite && (
                                    <ErrorMessage error={formik.errors.schoolWebsite} />
                                  )}
                              </Col>
                              <Col sm={6} className="mt-4">
                                <BootstrapForm.Label htmlFor="planSelection">
                                  Plan Selection
                                </BootstrapForm.Label>
                                <BootstrapForm.Control
                                  as="select"
                                  id="planSelection"
                                  name="planSelection"
                                  value={formik.values.planSelection}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select a plan</option>
                                  {planSelection &&
                                    planSelection.map((plan) => (
                                      <option key={plan._id} value={plan._id}>
                                        {plan.planName} {plan.pricing}
                                      </option>
                                    ))}
                                </BootstrapForm.Control>
                                {formik.touched.planSelection && formik.errors.planSelection && (
                                  <ErrorMessage error={formik.errors.planSelection} />
                                )}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="mt-3 mb-5">
                          <BootstrapForm.Label htmlFor="address">Address</BootstrapForm.Label>
                          <Col sm={4}>
                            <BootstrapForm.Control
                              type="text"
                              placeholder="Student Address"
                              id="address"
                              name="address"
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address && (
                              <ErrorMessage error={formik.errors.address} />
                            )}
                          </Col>
                          <Col sm={4}>
                            <BootstrapForm.Control
                              type="text"
                              placeholder="City/Village"
                              id="schoolCity"
                              name="schoolCity"
                              value={formik.values.schoolCity}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.schoolCity && formik.errors.schoolCity && (
                              <ErrorMessage error={formik.errors.schoolCity} />
                            )}
                          </Col>
                          <Col sm={4}>
                            <BootstrapForm.Control
                              type="text"
                              placeholder="Pin Code"
                              id="schoolPinCode"
                              name="schoolPinCode"
                              value={formik.values.schoolPinCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.schoolPinCode && formik.errors.schoolPinCode && (
                              <ErrorMessage error={formik.errors.schoolPinCode} />
                            )}
                          </Col>
                        </Row>
                      </Card>
                      {/* <div className="formLine"/> */}
                      <Card className="mt-1 p-3">
                        <Row className="mt-4">
                          <h5>Security & Password</h5>
                          <Col sm={6}>
                            <BootstrapForm.Label htmlFor="userName">Username</BootstrapForm.Label>
                            <BootstrapForm.Control
                              type="text"
                              placeholder="@School.ID123"
                              id="userName"
                              name="userName"
                              value={formik.values.userName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.userName && formik.errors.userName && (
                              <ErrorMessage error={formik.errors.userName} />
                            )}
                          </Col>
                          <Col sm={6}>
                            <BootstrapForm.Label htmlFor="createPassword">Create Password</BootstrapForm.Label>
                            <BootstrapForm.Control
                              type="password"
                              placeholder="Unique Password"
                              id="createPassword"
                              name="createPassword"
                              value={formik.values.createPassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.createPassword && formik.errors.createPassword && (
                              <ErrorMessage error={formik.errors.createPassword} />
                            )}
                          </Col>
                          <Col sm={6}>
                            <div className="mt-2">
                              <BootstrapForm.Label htmlFor="confirmPassword">Confirm Password</BootstrapForm.Label>
                              <BootstrapForm.Control
                                type="password"
                                placeholder="Re-enter Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <ErrorMessage error={formik.errors.confirmPassword} />
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Card>
                      <Row className="mt-3 ">
                        <Col className="d-flex justify-content-end">
                          <Col className="d-flex justify-content-end">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="termsCondition"
                                name="termsAndConditions"
                                checked={formik.values.termsAndConditions}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <label className="form-check-label" htmlFor="termsCondition">
                                Terms and Conditions
                              </label>
                            </div>
                            {formik.touched.termsAndConditions && formik.errors.termsAndConditions && (
                              <ErrorMessage error={formik.errors.termsAndConditions} />
                            )}
                          </Col>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            className={styles.submitBtn}
                            style={{ borderRadius: "60px" }}
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button
                            variant="secondary"
                            style={{ borderRadius: "60px" }}
                            className={styles.clearBtn}
                            onClick={() => {
                              formik.resetForm(); 
                            }}
                          >
                            Reset
                          </Button>
                        </Col>
                      </Row>
                    </BootstrapForm>
                    </FormikProvider>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSchool;
