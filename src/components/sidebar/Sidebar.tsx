import React, { useState,useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Image, Nav ,Row,Col} from "react-bootstrap";
//icons
import {
  AiFillSetting,
  AiOutlineLogout,
  AiFillMail,
  AiOutlineLineChart,
} from "react-icons/ai";
import { BiSolidSchool } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
//css
import styles from "./Sidebar.module.scss";
import {
  ANALYTICS,
  All_SCHOOL,
  HISTORY,
  LOGIN,
  SETTING,
} from "../../helper/PageRoute";
import { useSelector ,useDispatch} from "react-redux"; 
import { RootState } from "../../redux/store/rootReducer";
import {logoutAction} from "../../redux/reducers/userReducer";
import {getUserData} from "../../redux/reducers/settingReducer";
import sidebarLogo from "../../assets/images/sidebarLogo.png";
import { personalDetails } from "../../helper/Types";
import AnalyticsFinance from "../../pages/analytics-finance/AnalyticsFinance";
import Setting from "../../pages/settings/Setting";
import PlanHistory from "../../pages/plans/plan-history/PlanHistory";
import AllSchools from "../../pages/school/all-school/AllSchools";

 const Sidebar = ()  => {
  const { userData } = useSelector((state: RootState) => state.setting);
  const [active, setActive] = useState(1);
  const [activeBtn, setActiveBtn] = useState("first");
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleLogout =() =>{
    dispatch(logoutAction());
  localStorage.removeItem("token"); 
    navigate("/login");     
}
  useEffect(()=>{
  dispatch(getUserData() as never);
 }, [dispatch])
  return (
    <div id={styles.sidebar}>
      {/* Section 1: User Info */}
      <div className={`${styles.userInfo} d-flex mt-3 ${styles.section}`}>
       {
        userData? <>
         <Image        
            src={`${baseUrl}/${userData?.profileImage || sidebarLogo}`}       
            alt="user image"
          roundedCircle
          width={50}
        />
       <h5>{userData.name ? userData.name : "Prabha"}</h5> 
        </>
        :
        <>
         <Image        
            src={sidebarLogo}           
            alt="user image"
          roundedCircle
          width={50}
        />
       <h5>"Prabha"</h5> 
        </>
       }   
      </div>

      {/* Section 2: Routes */}
      <div className={`${styles.section} mt-5`}>
        <h5>Routes</h5>

        <Nav className="nav nav-pills flex-column">
          <Link
            to={ANALYTICS}
            className={
              active === 1
                ? "active nav-item align-items-center d-flex p-1"
                : "de-active nav-item align-items-center d-flex p-1"
            }
            onClick={(e) => setActive(1)}
          >
            <AiOutlineLineChart size={30} className="me-2" />
            <div>Analytics and Finance</div>
          </Link>
          <div className="line" />
          <Link
            to={HISTORY}
            className={
              active === 2
                ? "active nav-item align-items-center d-flex p-1"
                : "de-active nav-item align-items-center d-flex p-1"
            }
            onClick={(e) => setActive(2)}
          >
            <IoIosCreate size={30} className="me-2" />
            <div>Plans</div>
          </Link>
          <div className="line" />
          <Link
            to={All_SCHOOL}
            className={
              active === 3
                ? "active nav-item align-items-center d-flex p-1"
                : "de-active nav-item align-items-center d-flex p-1"
            }
            onClick={(e) => setActive(3)}
          >
            <BiSolidSchool size={30} className="me-2" />
            <div>School</div>
          </Link>
          <div className="line" />
          <Link
            to="#"
            className={
              active === 4
                ? "active nav-item align-items-center d-flex p-1"
                : "de-active nav-item align-items-center d-flex p-1"
            }
            onClick={(e) => setActive(4)}
          >
            <AiFillMail size={30} className="me-2" />
            <div>Mail and Messages</div>
          </Link>
          <div className="mt-5 border-0">
            <h5>Settings</h5>
            <button              
              className={
                active === 5
                  ? "active nav-item align-items-center d-flex p-1 border-0"
                  : "de-active nav-item align-items-center d-flex p-1 border-0"
              }
              onClick={handleLogout}
            >              
              <AiOutlineLogout size={30} className="me-2" />
              <div>Logout</div>
            </button>
            <Link
              to={SETTING}
              className={
                active === 6
                  ? "active nav-item align-items-center d-flex p-1 mt-2"
                  : "de-active nav-item align-items-center d-flex p-1 mt-2"
              }
              onClick={(e) => setActive(6)}
            >
              <AiFillSetting size={30} className="me-2" />
              <div>Settings</div>
            </Link>
          </div>
        </Nav>
      </div>
    </div>
    // <Container fluid className="main position-relative">
    //   <Row>
    //   <Col sm={2} bg="light" className="d-none d-md-block col-auto">
    //     <div id={styles.sidebar}>
       
    //     <div className={`${styles.userInfo} d-flex mt-3 ${styles.section}`}>
    //  {
    //   userData? <>
    //    <Image        
    //       src={`${baseUrl}/${userData?.profileImage || sidebarLogo}`}       
    //       alt="user image"
    //     roundedCircle
    //     width={50}
    //   />
    //  <h5>{userData.name ? userData.name : "Prabha"}</h5> 
    //   </>
    //   :
    //   <>
    //    <Image        
    //       src={sidebarLogo}           
    //       alt="user image"
    //     roundedCircle
    //     width={50}
    //   />
    //  <h5>"Prabha"</h5> 
    //   </>
    //  }   
    // </div>
 
    // <div className={`${styles.section} mt-5`}>
    //   <h5>Routes</h5>

    //   <Nav className="nav nav-pills flex-column">
    //     <Link
    //       to={ANALYTICS}
    //       className={
    //         activeBtn === "first"
    //           ? "active nav-item align-items-center d-flex p-1"
    //           : "de-active nav-item align-items-center d-flex p-1"
    //       }
    //       onClick={(e) => setActiveBtn("first")}
    //     >
    //       <AiOutlineLineChart size={30} className="me-2" />
    //       <div>Analytics and Finance</div>
    //     </Link>
    //     <div className="line" />
    //     <Link
    //       to={HISTORY}
    //       className={
    //         activeBtn === "two"
    //           ? "active nav-item align-items-center d-flex p-1"
    //           : "de-active nav-item align-items-center d-flex p-1"
    //       }
    //       onClick={(e) => setActiveBtn("two")}
    //     >
    //       <IoIosCreate size={30} className="me-2" />
    //       <div>Plans</div>
    //     </Link>
    //     <div className="line" />
    //     <Link
    //       to={All_SCHOOL}
    //       className={
    //         activeBtn === "three"
    //           ? "active nav-item align-items-center d-flex p-1"
    //           : "de-active nav-item align-items-center d-flex p-1"
    //       }
    //       onClick={(e) => setActiveBtn("three")}
    //     >
    //       <BiSolidSchool size={30} className="me-2" />
    //       <div>School</div>
    //     </Link>
    //     <div className="line" />
    //     <Link
    //       to="#"
    //       className={
    //         activeBtn === "four"
    //           ? "active nav-item align-items-center d-flex p-1"
    //           : "de-active nav-item align-items-center d-flex p-1"
    //       }
    //       onClick={(e) => setActiveBtn("four")}
    //     >
    //       <AiFillMail size={30} className="me-2" />
    //       <div>Mail and Messages</div>
    //     </Link>
    //     <div className="mt-5 border-0">
    //       <h5>Settings</h5>
    //       <button              
    //         className={
    //           activeBtn === "five"
    //             ? "active nav-item align-items-center d-flex p-1 border-0"
    //             : "de-active nav-item align-items-center d-flex p-1 border-0"
    //         }
    //         onClick={handleLogout}
    //       >              
    //         <AiOutlineLogout size={30} className="me-2" />
    //         <div>Logout</div>
    //       </button>
    //       <Link
    //         to={SETTING}
    //         className={
    //           activeBtn === "six"
    //             ? "active nav-item align-items-center d-flex p-1 mt-2"
    //             : "de-active nav-item align-items-center d-flex p-1 mt-2"
    //         }
    //         onClick={(e) => setActiveBtn("six")}
    //       >
    //         <AiFillSetting size={30} className="me-2" />
    //         <div>Settings</div>
    //       </Link>
    //     </div>
    //   </Nav>
    // </div>
    //     </div>
      
    //   </Col>
    //   <Col sm={10} id="content" bg="dark" className="main">
    //   {activeBtn === "first" && <AnalyticsFinance />}
    //   {activeBtn === "second" && <PlanHistory />}
    //   {activeBtn === "three" && <AllSchools />}
    //   {activeBtn === "six" && <Setting />}
    //   </Col> 
    //   </Row>
    // </Container>
  );
};

export default Sidebar;
