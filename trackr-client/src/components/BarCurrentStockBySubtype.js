import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";

import { AuthContext } from "../contexts/AuthContext";

const BarCurrentStockBySubtype = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(data);

  useEffect(() => {
    const chart = () => {
      if(data){
        var x=0;
        for (const dataObj of data) {
          x=x+dataObj;
        }
        setTotal(x);
      }
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Subtype",
            data: data,
            backgroundColor: contextType.colors,
          },
        ],
      });
    };
    chart();
  }, [labels, data, contextType]);
  return (
    <div className="chartContainer Chart Chartres  ">
      <Bar
        data={chartData}
        // height="140px"
        // height={"180%"}
        options={{
        //   layout: {
        //     padding: {
        //         left: 0,
        //         right: 0,
        //         top: 0,
        //         bottom: 0
        //     }
        // },
         
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        //   tooltips: {
        //     enabled: true
        // },
        // hover: {
        //     animationDuration: 1
        // },
        // animation: {
        // duration: 1,
        // onComplete: function () {
        //     var chartInstance = this.chart,
        //         ctx = chartInstance.ctx;
        //         ctx.textAlign = 'center';
        //         ctx.fillStyle = "rgba(0, 0, 0, 1)";
        //         ctx.textBaseline = 'bottom';
        //         // Loop through each data in the datasets
        //         this.data.datasets.forEach(function (dataset, i) {
        //             var meta = chartInstance.controller.getDatasetMeta(i);
        //             meta.data.forEach(function (bar, index) {
        //                 var data = dataset.data[index];
        //                 ctx.fillText(data, bar._model.x, bar._model.y - 5);
        //             });
        //         });
        //     }
        // },
        responsive: true,
          title: {text: "Current Stock by Subtype (Total: "+total+")", display: true},
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 20,
                  
    
                },
                
                maxBarThickness: 75,
                // maxBarLength: 10 ,
                scaleLabel: {
                  display: true,
                  labelString: "Subtypes",
                  fontColor: "black",
                  // fontSize:"13"
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
                  // max: 20,
                  beginAtZero: true,
    
                },

                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
                  fontColor: "black",
                  // fontSize:"13"
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarCurrentStockBySubtype;
