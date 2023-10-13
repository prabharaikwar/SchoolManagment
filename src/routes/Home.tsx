import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//css
import "../assets/css/main.scss";
//auth
import Login from "../pages/authentication/login/Login";
//route
import {
  LOGIN,
  ANALYTICS,
  CREATE_PLANS,
  HISTORY,
  VIEW_PLAN,
  ADD_SCHOOL,
  All_SCHOOL,
  EDIT_SCHOOL,
  SETTING,
  VIEW_SCHOOL
} from "../helper/PageRoute";
import AnalyticsFinance from "../pages/analytics-finance/AnalyticsFinance";
import CreatePlan from "../pages/plans/create-plans/CreatePlan";
import PlanHistory from "../pages/plans/plan-history/PlanHistory";
import SinglePlanView from "../pages/plans/view-plan/SinglePlanView";
import AllSchools from "../pages/school/all-school/AllSchools";
import AddSchool from "../pages/school/add-school/AddSchool";
import EditSchool from "../pages/school/edit-school/EditSchool";
import Setting from "../pages/settings/Setting";
import UserAuth from "../pages/authentication/user-auth/UserAuth";
import { RootState } from "../redux/store/rootReducer";
import ViewSchoolModal from "../components/common/modal/ViewSchoolModal";

const Home = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ?
          <Route path={LOGIN} element={<Login />} />
          : <>
            <Route path={ANALYTICS} element={<UserAuth><AnalyticsFinance /></UserAuth>} />
            <Route path={HISTORY}>
              <Route index element={<UserAuth><PlanHistory /></UserAuth>} />
              <Route path={CREATE_PLANS} element={<UserAuth><CreatePlan /></UserAuth>} />
              <Route path={VIEW_PLAN + "/:id"} element={<UserAuth><SinglePlanView /></UserAuth>} />
            </Route>
            <Route path={All_SCHOOL}>
              <Route index element={<UserAuth><AllSchools /></UserAuth>} />
              <Route path={ADD_SCHOOL} element={<UserAuth><AddSchool /></UserAuth>} />
              <Route path={EDIT_SCHOOL + "/:id"} element={<UserAuth><EditSchool /></UserAuth>} />
              <Route path={VIEW_SCHOOL + "/:id"} element={<UserAuth><ViewSchoolModal/></UserAuth>}/>
            </Route>
            <Route path={SETTING}>
              <Route index element={<Setting />} />
            </Route>
          </>
        }
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
