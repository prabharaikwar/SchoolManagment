import React, { useState, useEffect } from "react";
import { Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//data&time
import moment from "moment";
// filter
// import Filter from "../common/filter/Filter";
import SearchBar from "../common/serachbar/SearchBar";
import { TransitionHistoryType, MostSellingPlanType, TotalBalanceType, IncomeDataType, WeeklyIncome, MonthlyIncome, OverallSellingPlanType } from "../../helper/Types";
import { RootState } from "../../redux/store/store";
import Chart from "react-google-charts";
import { Line } from 'react-chartjs-2';

interface TransitionHistoryProps {
  transitionHistory: TransitionHistoryType[];
}

interface MostSellingPlanProps {  
  sellingPlan: MostSellingPlanType[];
}

interface CourseTransitionHistoryProps {
  filterYear?: string;
  setFilterYear?: string;
  transitionHistory: TransitionHistoryType[];
}

interface TotalIncomeProps {
  options?: IncomeDataType;
  onSelectFilter: string;
  selectedTimeRange:string;
}

interface OverAllSellingPlanProps {
  overAllSelling: OverallSellingPlanType[];
}
// export const TotalIncome = ({ options,selectedTimeRange,onSelectFilter, }: TotalIncomeProps) => {
//   const chartOptions = {
//     title: onSelectFilter === 'week' ? "Weekly Income" : "Monthly Income", // Adjust the chart title based on selectedTimeRange
//     hAxis: { title: onSelectFilter === 'week' ? "Day" : "Month" }, // Adjust the hAxis title
//     vAxis: { title: "Income" },
//   };
//   let data: Array<Array<string | number>> = [['Day/Month', 'Income']];

//   if (onSelectFilter === 'week' && options?.weeklyIncomeResult) {
//     data = data.concat(
//       options.weeklyIncomeResult.weeklyIncome.map((item: WeeklyIncome) => [
//         item.day,
//         item.income,
//       ])
//     );
//   } 
//   else if (onSelectFilter === 'month' && options?.monthlyIncomeResult) {
//     data = data.concat(
//       options.monthlyIncomeResult.monthlyIncome.map((item: MonthlyIncome) => [
//         item.month,
//         item.income,
//       ])
//     );
//   }
// }


interface LineChartProps {
  data: any; 
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export const TotalBalance: React.FC<TransitionHistoryProps> = ({ transitionHistory }) => {
  return (
    <div>
      <h6>Transition History</h6>
      <Table striped bordered hover variant="secondary">
        <thead>
          <tr>
            <th>Withdraw Amount</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {transitionHistory.map((item: TransitionHistoryType, index: any) => {
            const formattedDate = moment(item.date).format('MMMM Do YYYY, h:mm:ss a');
            return (
            <tr key={index}>
              <td>{item.planPricing}</td>
              <td>{formattedDate}</td>
            </tr>
          )
          })}
        </tbody>
      </Table>
    </div>
  );
};

export const CourseTransitionHistory: React.FC<CourseTransitionHistoryProps> = ({
  filterYear,
  setFilterYear,
  transitionHistory,
}) => {

  const baseUrl = process.env.REACT_APP_BASE_URL;
  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr>
          <th>Buyer Name/Image</th>
          <th>Sailed Plan Name</th>
          <th>Category Name</th>
          <th>Date/Time</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(transitionHistory) &&
          transitionHistory.map((item: TransitionHistoryType, index: any) => {
            const formattedDate = moment(item.date).format('MMMM Do YYYY, h:mm:ss a');
            return (
              <tr key={index}>
                <td>
                  <img src={`${baseUrl}/${item.schoolLogo}`}
                    alt="school logo"
                    className="img-fluid school-logo"
                  />
                </td>
                <td>{item.schoolName}</td>
                <td>{item.planName}</td>
                <td>{item.planPricing}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export const MostSellingPlan: React.FC<MostSellingPlanProps> = ({sellingPlan}) => {
  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td>Test Name :</td>
            <td>Total Purchased:</td>
            <td>Total Earning : </td>
          </tr>
          {sellingPlan.map((item:MostSellingPlanType,index:any)=>{
            return(
              <tr>
                <td>
                  {item.planName}
                </td>
                <td>
                  {item.totalPurchase}
                </td>
                <td>
                  {item.totalAmount}
                </td>
              </tr>
            )
          })
            
          }
          <tr>
            
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export const OverallSelling: React.FC<OverAllSellingPlanProps>  = ({overAllSelling}) => {
  console.log("overA",overAllSelling);
 
  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Total sell</th>
          <th>Total Earning</th>
        </tr>
      </thead>
      <tbody>
      {overAllSelling?.map((item: OverallSellingPlanType, index: any) => {
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td>{item.totalPurchase}</td>
        <td>{item.totalAmount}</td>
      </tr>
    );
  })}
      </tbody>
    </Table>
  );
};

