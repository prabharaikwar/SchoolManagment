// import React from "react";
// import { MDBContainer } from "mdbreact";
// import { Line } from "react-chartjs-2";
// import { CartesianScaleOptions } from "chart.js";

// const LineChart = () => {
//   const data = {
//     labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     datasets: [
//       {
//         label: "Hours Studied in Geeksforgeeks",
//         data: [2, 5, 7, 9, 7, 6, 4],
//         fill: true,
//         backgroundColor: "rgba(6, 156, 51, 0.3)",
//         borderColor: "#02b844",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: "category" as keyof CartesianScaleOptions, 
//       },
//     },
//   };

//   return (
//     <MDBContainer>
//       <Line data={data} options={options} />
//     </MDBContainer>
//   );
// };

// export default LineChart;
import React from "react";
import Chart from 'react-google-charts'
const LineChart = () => {
  const LineData = [
    ['x', 'dogs', 'cats'],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ]
  const LineChartOptions = {
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    series: {
      1: { curveType: 'function' },
    },
  }
  return (
    <div className="container mt-5">        
        <Chart
          // width={'100%'}
          // height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
  )
}

export default LineChart;