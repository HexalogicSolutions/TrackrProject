import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarSaleQuantityBySubtype = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const chart = () => {
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Quantity",
            data: data,
            backgroundColor: contextType.colors,
          },
        ],
      });
    };
    chart();
  }, [labels, data, contextType]);

  return (
    <div className="chartContainer Chart  ">
      <Bar
        data={chartData}
        // height="140px"
        options={{
          legend: {
            display: false,
          },
          responsive: true,
          title: { text: "Sale Quantity by Subtype", display: true },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Subtype",
                  fontColor: "black",
                },
              },
            ],
            yAxes: [
              {
                id: "y-axis-1",
                display: true,
                position: "left",
                ticks: {
                  min: 0,
                  // max: 10,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
                  fontColor: "black",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarSaleQuantityBySubtype;
