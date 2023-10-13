import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { TbLockPlus } from "react-icons/tb";
import PersonalDetails from "../../components/common/modal/PersonalDetails";
import PasswordSecurity from "../../components/common/modal/PasswordSecurity";
import Sidebar from "../../components/sidebar/Sidebar";

const Setting = () => {
  const [openPersonalDetails, setOpenPersonalDetails] = useState(false);
  const [openPasswordSecurity, setOpenPasswordSecurity] = useState(false);
  // ModalOpen
  const OpenModalOne = () => setOpenPersonalDetails(true);
  const HideModalOne = () => setOpenPersonalDetails(false);
  const OpenModalTwo = () => setOpenPasswordSecurity(true);
  const HideModalTwo = () => setOpenPasswordSecurity(false);

  return (
    <Container fluid className="main position-relative container-h">
      <Row>
        <Col sm={2} bg="light" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" bg="dark" className="main">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <div className="p-2" >
              <h4 className="textTeal">Settings</h4>
              <Card className="p-1 mb-3 ">
                <button
                  className="d-flex text-center justify-content-between border-0"
                  onClick={OpenModalOne}
                >
                  <div className="d-flex text-center justify-content-between">
                    <button className="p-1 lock-btn me-3 mb-1">
                      <TbLockPlus size={30} />
                    </button>
                    <h5 className="d-flex align-items-end">Personal Details</h5>
                  </div>
                  <button className="bg-transparent border-0 mt-1">
                    <BsArrowRight size={30} />
                  </button>
                </button>
              </Card>
              <PersonalDetails
                modalOpen={openPersonalDetails}
                Hide={HideModalOne}
              />
              <Card className="p-1 mb-3">
                <div className="d-flex text-center justify-content-between">
                  <div className="d-flex text-center justify-content-between">
                    <button className="p-1 lock-btn me-3 mb-1">
                      <TbLockPlus size={30} />
                    </button>
                    <h5 className="d-flex align-items-end">
                      Create Mail for Schools
                    </h5>
                  </div>
                  <button className="bg-transparent border-0">
                    <BsArrowRight size={30} />
                  </button>
                </div>
              </Card>
              <Card className="p-1 mb-3">
                <button
                  className="d-flex text-center justify-content-between border-0"
                  onClick={OpenModalTwo}
                >
                  <div className="d-flex text-center justify-content-between">
                    <button className="p-1 lock-btn me-3 mb-1">
                      <TbLockPlus size={30} />
                    </button>
                    <h5 className="d-flex align-items-end">
                      Password and security
                    </h5>
                  </div>
                  <button className="bg-transparent border-0 mt-1">
                    <BsArrowRight size={30} />
                  </button>
                </button>
              </Card>
              <PasswordSecurity
                openModal={openPasswordSecurity}
                Hide={HideModalTwo}
              />
              <Card className="p-1">
                <div className="d-flex text-center justify-content-between align-item-center">
                  <div className="d-flex text-center justify-content-between">
                    <button className="p-1 lock-btn me-3 mb-1">
                      <TbLockPlus size={30} />
                    </button>
                    <h5 className="d-flex align-items-end">
                      Terms & Conditions
                    </h5>
                  </div>
                  <button className="bg-transparent border-0">
                    <BsArrowRight size={30} />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Setting;
