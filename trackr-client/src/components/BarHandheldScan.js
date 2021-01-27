import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";
import BarCurrentStockBySubtype from "./BarCurrentStockBySubtype";

const BarHandheldScan = ({ labels, totalVals, missingVals, scannedVals }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  const chart = () => {
    // console.log("inside BarHandheldScanNew");
    // console.log("Labels: "+labels);
    // console.log("totalVals:"+totalVals);
    // console.log("scannedVals:"+scannedVals);
    // console.log("missingVals:"+missingVals);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: totalVals,

          backgroundColor: "blue",
        },
        {
          label: "Scanned",
          data: scannedVals,

          backgroundColor: "#00C49F",
        },
        {
          label: "Missing",
          data: missingVals,
          backgroundColor: "red",
        },
      ],
    });
    // console.log(labels, chartData);
  };

  useEffect(() => {
    chart();
  }, [labels, totalVals, missingVals, scannedVals]);
  // }, [labels, totalVals, missingVals, scannedVals]);

  const options = {
    responsive: true,
    // tooltips:false,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
    // tooltips:false,
    // plugins: {
    //     datalabels: {
    //        display: true,
    //        color: 'white'
    //     }
    //  },

    title: {
      display: true,
      text: "Handheld Inventory Scan",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: "Count",
            fontColor: "black",
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 0.8,
          //   type: "time",
          //   time: {
          //     // unit: "minute",
          //     // unitStepSize: 1,
          //     displayFormats: {
          //       month: "HH:mm",
          //     },
          //   },
          scaleLabel: {
            display: true,
            labelString: "Date/Time",
            fontColor: "black",
          },
        },
      ],
    },
  };

  return (
    <div className="chartContainer Chart  ">
      <Bar data={chartData} height={240} options={options} />
    </div>
  );
};

export default BarHandheldScan;
