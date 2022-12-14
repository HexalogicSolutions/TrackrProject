import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarCurrentStockByMaterial = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(0);
  // const chart = () => {
  //   setChartData({
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Total Material",
  //         data: data,
  //         backgroundColor: contextType.colors,
  //       },
  //     ],
  //   });
  // };

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
            label: "Total Material",
            data: data,
            backgroundColor: contextType.colors,
          },
        ],
      });
    };
    chart();
  }, [labels, data, contextType]);

  return (
    <div className="chartContainer Chart  Chartres ">
      <Bar
        data={chartData}
        // height="140px"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          
          tooltips: {
            enabled: true
        },
        hover: {
            animationDuration: 1
        },
        animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.font = "0.8em sans-serif";
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.textBaseline = 'middle';
           
                // Loop through each data in the datasets
                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y -5);
                    });
                });
            }
        },
          responsive: true,
          title: { text: "Current Stock by Material (Total: "+total+")", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  // max: 30,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
                  fontColor: "black",
                  // fontSize:"13"
                },
              },
            ],
            xAxes: [
              {
           
                scaleLabel: {
                  display: true,
                  labelString: "Material",
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

export default BarCurrentStockByMaterial;
