import React, { useState } from "react";
import { Modal, Button, Container, Card, Form as BootstrapForm, } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { PasswordSecuritySchema } from "../../../helper/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../helper/Types";
import { passwordChanged } from "../../../redux/reducers/settingReducer";
import { RootState } from "../../../redux/store/store";

interface ModalProps {
  openModal: boolean;
  Hide: () => void;
}

const PasswordSecurity: React.FC<ModalProps> = ({ openModal, Hide }) => {
  const { error, passwordChangeSuccess, passwordChangeError } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg,setErrorMsg] =useState(false);

  const handleSuccessClose = () => {
    setSuccess(false); // Close the success message
  };
  const handlePasswordChangeErrorClose=()=>{
    setErrorMsg(true);
  }
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleChangePassword = async (values: changePassword) => {
    console.log("handleChangePassword function called");
    dispatch(passwordChanged(values) as never);
    console.log("Sending request with values:", values);
    setSuccess(true);
  };

  return (
    <Modal show={openModal} onHide={Hide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Password&Security</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Card>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={PasswordSecuritySchema}
                onSubmit={(values) => handleChangePassword(values) as never}
              >
                {({ isSubmitting, isValid }) => (
                  <FormikForm>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="oldPassword" className="me-5">Current Password:</BootstrapForm.Label>
                      <Field
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        autoComplete="old-password"
                      />
                      <ErrorMessage
                        name="oldPassword"
                        component="div"
                        className="alert alert-danger mt-2"
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="newPassword" className="me-5">New Password:</BootstrapForm.Label>
                      <Field
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        autoComplete="new-password"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="alert alert-danger mt-2"
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group>
                      <BootstrapForm.Label htmlFor="confirmPassword" className="me-2">
                        Confirm New Password:
                      </BootstrapForm.Label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="confirm-password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="alert alert-danger mt-2"
                      />
                    </BootstrapForm.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-3"
                    >
                      Change Password
                    </Button>
                  </FormikForm>
                )}
              </Formik>
              {passwordChangeSuccess && (
                <div className="alert alert-success mt-2" role="alert">
                  Password changed successfully!
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => {
                      handleSuccessClose();
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
                 {passwordChangeError && (
                <div className="alert alert-danger mt-2" role="alert">
                  {passwordChangeError}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => {
                      handlePasswordChangeErrorClose();
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                  )}
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordSecurity;
