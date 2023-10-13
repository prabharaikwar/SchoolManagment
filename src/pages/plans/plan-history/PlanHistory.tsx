import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import moment from 'moment';
//css
import styles from "./PlanHistory.module.scss";
//route
import { CREATE_PLANS, VIEW_PLAN } from "../../../helper/PageRoute";
//component
import { PlanFilter } from "../../../components/common/filter/Filter";
import SearchBar from "../../../components/common/serachbar/SearchBar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Plan } from "../../../helper/Types";
import { planHistoryAsync } from "../../../redux/reducers/planReducer";
import { RootState } from "../../../redux/store/store";

const PlanHistory = () => {
  const { Plans, loading } = useSelector((state: RootState) => state.plan);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const handleFilterChange = (selectedPlanFilter: {
    label: string;
    value: string;
  }) => {
    setSelectedFilter(selectedPlanFilter);
  };

  const applyFilter = (
    plans: Plan[],
    filter: { label: string; value: string } | null
  ) => {
    if (!filter) {
      return plans; // Return all plans if no filter is applied
    }

    const filteredPlans = plans.filter((plan) => {
      const planName = plan.planName.toLowerCase();
      const filterValue = filter.value.toLowerCase();
      const isMatch = planName.includes(filterValue);
  
      console.log("Plan Name:", planName);
      console.log("Filter Value:", filterValue);
      console.log("Is Match:", isMatch);
  
      return isMatch;
      });

  console.log("Filtered Plans (applyFilter):", filteredPlans);

  return filteredPlans;
  };

  useEffect(() => {
    dispatch(planHistoryAsync() as never);
  }, [dispatch]);

  //serach
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const applySearch = (plans: Plan[], query: string) => {
    if (!query) {
      return plans; // Return all plans if no search query is entered
    }
    query = query.toLowerCase();
    return plans.filter((plan) =>
      plan.planName.toLowerCase().includes(query)
    );
  };
  
  const filteredPlans: Plan[] = applySearch(
    applyFilter(Plans, selectedFilter),
    searchQuery
  ) as any; 
  
   return (
    <Container fluid className="main position-relative container-h">
      <Row>
        <Col sm={2} bg="light" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" bg="dark" className="main">
          <div style={{width: "100%", margin: "auto", paddingTop: "1%"  }}>
            <Container>
              <Row className="mb-3">
                <nav
                  className={`${styles.nav} d-flex align-items-center justify-content-between mx-auto`}
                >
                  <h5>Plan History</h5>
                  <div className="d-flex align-items-center justify-content-evenly">
                    <div className="me-3">
                    <SearchBar handleSearch={handleSearch} />
                    </div>
                    <div className="me-3">
                      <PlanFilter
                        options={[
                          { label: "Platinum Plan", value: "platinumplan" },
                          { label: "Basic Plan", value: "basicPlan" },
                          { label: "Gold Plan", value: "goldPlan" },
                          { label: "Platinum", value: "Platinum" },
                          { label: "Gold Plan", value: "Gold" },
                        ]}
                        onSelectFilter={handleFilterChange}
                      />
                    </div>
                    <div>
                      <Button
                        className="rounded-pill"
                        variant="secondary"
                        onClick={() => navigate(CREATE_PLANS)}
                      >
                        Create Plan <AiOutlinePlusCircle />
                      </Button>
                    </div>
                  </div>
                </nav>
              </Row>
              <Row>
                <Col>
                  <Table className="mt-2">
                    <thead>
                      <tr>
                        <th>P.No.</th>
                        <th>Plan Name/Title</th>
                        <th>Plan Creation Date & Time</th>
                        <th>Current Mode</th>
                        <th>View Plan</th>
                      </tr>
                    </thead>                    
                      <tbody>
                      {
                        filteredPlans.map((data:any, index:any) => {
                          const formattedDate = moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                          return (
                            <tr key={index}>
                              <td>{data.planNumber}</td>
                              <td>{data.planName}</td>
                              <td>{formattedDate}</td>                              
                              <td>
                                <Button
                                  className={`${styles.mode_btn} rounded-pill border-dark`}
                                  variant="outlined"
                                >
                                  {data.planActivation}
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className={`${styles.view_btn} rounded-pill`}
                                  variant="secondary"
                                  onClick={() => {
                                    navigate(`${VIEW_PLAN}/${data._id}`);
                                  }}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>         
                  </Table>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanHistory;
