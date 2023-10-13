import React,{useEffect, useState} from "react";
import { Row, Col, Container } from "react-bootstrap";
//DashboardCard
import AnalyticsFinanceCard from "../../components/common/card/AnalyticsFinanceCard";
import SearchBar from "../../components/common/serachbar/SearchBar";
import {
  // TotalIncome,
  TotalBalance,
  CourseTransitionHistory,
  OverallSelling,
  MostSellingPlan,
  LineChart
} from "../../components/dashboard-tables/Table";
// import LineChart from "../../components/chart/LineChart";
import {TotalIncomeFilter,CourseTransitionFilter} from "../../components/common/filter/Filter";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Navigate, useNavigate  } from "react-router-dom";
import { setTimeframeThunk } from "../../redux/reducers/totalIncomeReducer";
import { transitionHistoryAsync } from "../../redux/reducers/transitionHistoryReducer";
import { totalBalanceAsync } from "../../redux/reducers/totalBalanceReducer";
import { MonthlyIncome, TotalBalanceType,TransitionHistoryType, WeeklyIncome } from "../../helper/Types";
import { mostSellingPlanAsync } from "../../redux/reducers/mostSellingPlanReducer";
import {overAllSellingAsync} from "../../redux/reducers/overallSellingPlan";
import Dropdown from "../../components/common/filter/DropDown";

const AnalyticsFinance = () => {
  // const { chartData } = useSelector((state: RootState) => state.totalIncome);
  const { transitionHistory } = useSelector((state: RootState) => state.transitionHistory) as { transitionHistory: TransitionHistoryType[] };
   const {TotalBalanceData} = useSelector((state:RootState)=>state.totalBalance );
  const {sellingPlan} = useSelector((state:RootState) => state.mostSelling);
  const {overAllSelling} = useSelector((state:RootState)=> state.overAllSelling);
 

  const dispatch = useDispatch();
  const [weekData, setWeekData] = useState<WeeklyIncome[]>([]);
  const [monthData, setMonthData] = useState<MonthlyIncome[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('week');

  useEffect(()=>{   
    dispatch(mostSellingPlanAsync() as any);
    dispatch(totalBalanceAsync() as any);
    dispatch(overAllSellingAsync() as never);
    dispatch(transitionHistoryAsync() as any);
  },[dispatch])

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
  };

  return (    
    <Container fluid className="main position-relative ">
      <Row>
        <Col sm={2} bg="light" className="d-none d-md-block col-auto">
          <Sidebar />
        </Col>
        <Col sm={10} id="content" bg="dark" className="main">
          <div style={{ width: "100%", margin: "auto", paddingTop: "1%" }}>
            <div className="ms-4">
              <Row className="mb-3">
                <Col md={6}>    
                  <AnalyticsFinanceCard
                  heading={"Total Income"}
                  total={6327363}
                  // content={<LineChart data={chartData}/>}
                //  filter={ <Dropdown timeframe={chartData} />}
                  />
                </Col>
                <Col md={6}>
                  <AnalyticsFinanceCard
                    heading={"Total Balance"}
                    content={<TotalBalance transitionHistory={transitionHistory}/>}
                    total={TotalBalanceData}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <AnalyticsFinanceCard
                    heading={"Course Transition History"}
                    // search={<SearchBar />}
                    content={<CourseTransitionHistory transitionHistory={transitionHistory} />}
                    filter={<CourseTransitionFilter options={[]} onSelectFilter={() => {}}/>}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <AnalyticsFinanceCard
                    heading={"most selling plan"}
                    content={<MostSellingPlan sellingPlan={sellingPlan}/>}
                  />
                </Col>
                <Col md={8}>
                  <AnalyticsFinanceCard
                    heading={"list of overall selling plan"}
                    // search={<SearchBar />}
                    content={<OverallSelling overAllSelling={overAllSelling}/>}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsFinance;
