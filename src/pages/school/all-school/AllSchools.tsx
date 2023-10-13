import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_SCHOOL, EDIT_SCHOOL, VIEW_PLAN, VIEW_SCHOOL } from "../../../helper/PageRoute";
import { PlanFilter } from "../../../components/common/filter/Filter";
import SearchBar from "../../../components/common/serachbar/SearchBar";
import ViewSchoolModal from "../../../components/common/modal/ViewSchoolModal";
import Sidebar from "../../../components/sidebar/Sidebar";
//redux
import { School } from "../../../helper/Types";
import { getAllSchoolsAsync } from "../../../redux/reducers/schoolReducer";
import { RootState } from "../../../redux/store/store";

const AllSchools = () => {
  const { schools, loading } = useSelector((state: RootState) => state.school);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<School | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    dispatch(getAllSchoolsAsync() as never);
  }, [dispatch]);

  //Search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  //Fillter
  const handleFilterChange = (selectedSchoolFilter: School) => {
    setSelectedFilter(selectedSchoolFilter);
  };

  const applyFilter = (schools: School[], filter: School | null) => {
    if (!filter) {
      return schools; // Return all schools if no filter is applied
    }

    const filteredSchools = schools.filter((school) => {
      // return school.someProperty === filter.someProperty;
    });
    return filteredSchools;
  };
  const applySearch = (schools: School[], query: string) => {
    if (!query) {
      return schools; // Return all schools if no search query is entered
    }

    query = query.toLowerCase();
    return schools.filter((school) =>
      school.schoolName.toLowerCase().includes(query)
    );
  };

  // Render the filtered and searched schools
  const filteredSchools = applySearch(
    applyFilter(schools, selectedFilter),
    searchQuery
  );

  return (
    <Container fluid className="main position-relative container-h">
      <Row>
        <Col sm={2} bg="light" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" bg="dark" className="main">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <Container>
              <Row className="mb-3">
                <nav className="d-flex align-items-center justify-content-between mx-auto">
                  <h5 className="textTeal">All School List</h5>
                  <div className="d-flex align-items-center justify-content-evenly">
                    <div className="me-3">
                      <SearchBar handleSearch={handleSearch} />
                    </div>
                    <div className="me-3">
                      <PlanFilter options={[
                        { label: "IPS", value: "IPS" },
                        { label: "medicaps", value: "medicaps" },
                      ]}
                        onSelectFilter={() => { }} />
                    </div>
                    <div>
                      <Button
                        className="rounded-pill"
                        variant="secondary"
                        onClick={() => navigate(ADD_SCHOOL)}
                      >
                        Add School <AiOutlinePlusCircle />
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
                        <th>School logo</th>
                        <th>School Name</th>
                        <th>Edit School</th>
                        <th>View School</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredSchools.map((data: School, index) => {
                          return (
                            <tr key={index} className="align-items-center">
                              <td>
                                <img
                                  src={`${baseUrl}/${data.schoolLogo}`}
                                  alt="school logo"
                                  className="img-fluid school-logo"
                                />
                              </td>
                              <td>{data.schoolName}</td>
                              <td>
                                <Button
                                  className="rounded-pill view_btn"
                                  variant="primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`${EDIT_SCHOOL}/${data._id}`)
                                  }}
                                >
                                  edit
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="rounded-pill view_btn"
                                  variant="secondary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`${VIEW_SCHOOL}/${data._id}`);
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

export default AllSchools;
