import React, { Component } from "react";
import Barchart from "../components/Barchart";
import Linechart from "../components/Linechart";
import Barchart2 from "../components/Barchart2";
import { AuthContext } from "../contexts/AuthContext";
import Linechart2 from "../components/Linechart2";
import Horizontalbar from "../components/HorizontalBar";
import DoughnutChart from "../components/DoughnutChart";
import BarCurrentStockByMaterial from "../components/BarCurrentStockByMaterial";
import BarSaleQuantityByMaterial from "../components/BarSaleQuantityByMaterial";
import PriceChart from "../components/PriceChart";
import { PrintContextConsumer } from "react-to-print";
import BarCurrentStockBySubtype from "../components/BarCurrentStockBySubtype";
import BarSaleAmountBySubtype from "../components/BarSaleAmountBySubtype";
import BarSaleAmountByMaterial from "../components/BarSaleAmountByMaterial";
import { RiRefreshFill } from "react-icons/ri";
import axios from "axios";

import { Fragment } from "react";
import BarSaleQuantityBySubtype from "../components/BarSaleQuantityBySubtype";
import { Doughnut } from "react-chartjs-2";
import PieCurrentItemByStatus from "../components/PieCurrentItemByStatus";
import BarHandheldScan from "../components/BarHandheldScan";
import BarHandheldInduction from "../components/BarHandheldInduction";
import DataHelper from "../util/DateHelper";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLabel: "New",
      myFromDate: "",
      myToDate: "",
      fromDate: "",
      toDate: "",


      BarSaleQuantityByMaterialLabels: [],
      BarSaleQuantityByMaterialData: [],
      BarSaleQuantityBySubtypeLabels: [],
      BarSaleQuantityBySubtypeData: [],
      BarSaleAmountBySubtypeLabels: [],
      BarSaleAmountBySubtypeData: [],
      BarSaleAmountByMaterialLabels: [],
      BarSaleAmountByMaterialData: [],
      BarCurrentStockByMaterialLabels: [],
      BarCurrentStockByMaterialData: [],
      PieCurrentitemByStatusLabels: [],
      PieCurrentitemByStatusData: [],
      BarHandheldScanLabels: [],
      BarHandheldScanTotalData: [],
      BarHandheldScanScannedData: [],
      BarHandheldScanMissingData: [],
      BarHandheldInductionLabels: [],
      BarHandheldInductionData: [],
    };
  }

  static contextType = AuthContext;

  fromdate = (event) => {
    this.setState({ fromDate: event.target.value + "T00:00:00.000Z" });
  };

  todate = (event) => {
    this.setState({ toDate: event.target.value + "T23:59:00.000Z" });
  };

  refresh = (event) => {
    this.drawBarSaleQuantityByMaterial();
    this.drawBarSaleQuantityBySubtype();
    this.drawBarSaleAmountBySubtype();
    this.drawBarSaleAmountByMaterial();
    this.drawBarCurrentStockByMaterial();
    this.drawBarCurrentStockBySubtype();
    this.drawPieCurrentitemByStatus();
    this.drawBarHandheldScan();
    this.drawBarHandheldInduction();
  };

  setDefaultDate = () => { 

    var currDate = new Date();
    var fromDate = new Date();

    // subtract 7 days from current date
    fromDate.setDate(currDate.getDate() - 7);

    // console.log("DATE", fromDate);

    this.setState({ fromDate: DataHelper.getStartOfDate(fromDate) });
    this.setState({ toDate: DataHelper.getEndOfDate(currDate) });
    //this.setState({ myFromDate: formatDate(fromDate) });
    this.setState({ myFromDate: DataHelper.formatDate(fromDate) });
    this.setState({ myToDate: DataHelper.formatDate(currDate) }, () => this.refresh());

  };

  drawBarSaleQuantityByMaterial = () => {
    let labels = [];
    let data = [];

    var qs =
      this.context.dbUrl +
      "sales/sale-quantity-by-material?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;
    console.log("query:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalMaterial);
        }
        // console.log("Len:"+labels.length);
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        // console.log("Labelsxx:"+labels);
        // console.log("Dataxx:"+data);
        this.setState({ BarSaleQuantityByMaterialLabels: labels });
        this.setState({ BarSaleQuantityByMaterialData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawPieCurrentitemByStatus = () => {
    let labels = [];
    let data = [];

    var qs =
      this.context.dbUrl +
      "entity/current-stock-by-status?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;

    if (this.state.toDate.length == 0) return;
    // console.log("statusquery:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalMaterial);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        // console.log("Len:"+labels.length);

        // console.log("Labelsxx:"+labels);
        // console.log("Dataxx:"+data);
        this.setState({ PieCurrentitemByStatusLabels: labels });
        this.setState({ PieCurrentitemByStatusData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarSaleQuantityBySubtype = () => {
    let labels = [];
    let data = [];

    var qs =
      this.context.dbUrl +
      "sales/sale-quantity-by-subtype?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;
    // console.log("query:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalSubtype);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        // console.log("mylabels:"+labels);
        // console.log("mydata:"+data);
        this.setState({ BarSaleQuantityBySubtypeLabels: labels });
        this.setState({ BarSaleQuantityBySubtypeData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarSaleAmountBySubtype = () => {
    let labels = [];
    let data = [];

    var qs =
      this.context.dbUrl +
      "sales/sale-amount-by-subtype?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;
    // console.log("Amountquery:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalSubtype);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        this.setState({ BarSaleAmountBySubtypeLabels: labels });
        this.setState({ BarSaleAmountBySubtypeData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarSaleAmountByMaterial = () => {
    let labels = [];
    let data = [];

    var qs =
      this.context.dbUrl +
      "sales/sale-amount-by-material?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;
    // console.log("query:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalMaterial);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        this.setState({ BarSaleAmountByMaterialLabels: labels });
        this.setState({ BarSaleAmountByMaterialData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarCurrentStockByMaterial = () => {
    let labels = [];
    let data = [];

    axios
      .get(this.context.dbUrl + "entity/current-stock-by-material")
      .then((res) => {
        console.log("current-stock-by-material====");
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalMaterial);
          console.log("material:" + dataObj._id);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        // console.log("Stock labels:"+labels);
        // console.log("Stock data:"+data);
        this.setState({ BarCurrentStockByMaterialLabels: labels });
        this.setState({ BarCurrentStockByMaterialData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarCurrentStockBySubtype = () => {
    let labels = [];
    let data = [];

    axios
      .get(this.context.dbUrl + "entity/current-stock-by-subtype")
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          labels.push(dataObj._id);
          data.push(dataObj.TotalMaterial);
        }
        if (labels.length == 0) {
          labels.push("No Data Found!");
          data.push(0);
        }
        // console.log("Stock labels:"+labels);
        // console.log("Stock data:"+data);
        this.setState({ BarCurrentStockBySubtypeLabels: labels });
        this.setState({ BarCurrentStockBySubtypeData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarHandheldScan = () => {
    // console.log("inside drawBarHandheldScan()");
    var qs =
      this.context.dbUrl +
      "handheld/handheld-scan?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;

    if (this.state.toDate.length == 0) return;
    console.log("query:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res.data);
        let labels = [];
        let totalVals = [];
        let missingVals = [];
        let scannedVals = [];

        let x = 0;
        for (const dataObj of res.data) {
          if (!dataObj._id) {
            labels.push("No Data Found!");
            totalVals.push(0);
            missingVals.push(0);
            scannedVals.push(0);
            break;
          }
          // future date/

          var dt1 = new Date(dataObj._id);
          var dt = new Date(dt1.getTime() - 330 * 60000);
          // covert to UTC/GMT
          // var isoDateString = dt1.toISOString();
          // console.log("UTC:"+isoDateString);
          // var dt = new Date(isoDateString);

          // console.log("Old - "+dt.getHours()+":"+dt.getMinutes());
          // console.log("New - "+dt1.getHours()+":"+dt1.getMinutes());
          //           var format = new SimpleDateFormat("dd MMM hh:mm");
          //           var dateStr = format.format(dt);
          //           console.log("DT: "+dateStr);

          //           var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
          // console.log(date_format_str);
          var dt3 = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(dt);
          // const today = Date.now();
          console.log(
            new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(dt)
          );
          var hh = dt.getHours();
          console.log("hh:" + hh);
          if (hh < 10) hh = "0" + hh;
          var mm = dt.getMinutes();
          if (mm < 10) mm = "0" + mm;

          labels.push(dt3);
          totalVals.push(dataObj.total);
          missingVals.push(dataObj.missing);
          scannedVals.push(dataObj.scanned);
          x = x + 1;
        }

        if (labels.length === 0) {
          labels.push("No Data Found!");
          totalVals.push(0);
          missingVals.push(0);
          scannedVals.push(0);
        }

        this.setState({ BarHandheldScanLabels: labels });
        this.setState({ BarHandheldScanMissingData: missingVals });
        this.setState({ BarHandheldScanTotalData: totalVals });
        this.setState({ BarHandheldScanScannedData: scannedVals });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  drawBarHandheldInduction = () => {
    var qs =
      this.context.dbUrl +
      "handheld/handheld-induction?" +
      "fromDt=" +
      this.state.fromDate +
      "&toDt=" +
      this.state.toDate;

    if (this.state.toDate.length == 0) return;
    console.log("query:" + qs);
    axios
      .get(qs)
      .then((res) => {
        // console.log(res.data);
        let labels = [];
        let data = [];

        let x = 0;
        for (const dataObj of res.data) {
          if (!dataObj._id) {
            labels.push("No Data Found!");
            data.push(0);

            break;
          }
          var dt1 = new Date(dataObj._id);
          var dt = new Date(dt1.getTime() - 330 * 60000);
          var dt3 = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(dt);
          var hh = dt.getHours();
          if (hh < 10) hh = "0" + hh;
          var mm = dt.getMinutes();
          if (mm < 10) mm = "0" + mm;

          labels.push(dt3);
          data.push(dataObj.inducted);

          x = x + 1;
        }

        if (labels.length === 0) {
          labels.push("No Data Found!");
          data.push(0);
        }

        this.setState({ BarHandheldInductionLabels: labels });
        this.setState({ BarHandheldInductionData: data });
      })
      .catch((err) => {
        console.log("Err:" + err);
      });
  };

  componentDidMount() {
    this.setDefaultDate();
    this.drawBarSaleQuantityByMaterial();
    this.drawPieCurrentitemByStatus();
    this.drawBarSaleQuantityBySubtype();
    this.drawBarSaleAmountBySubtype();
    this.drawBarCurrentStockByMaterial();
    this.drawBarCurrentStockBySubtype();
    this.drawBarHandheldScan();
    this.drawBarHandheldInduction();
  }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper scroll">
          {/* <div className="container header detail scroll"> */}
          <section className="content-header">
            <h1>
              Hexa
              <small>Logic</small>
              <small className="ver"> Ver: {this.context.APP_VERSION}</small>
            </h1>

            <br></br>
            <div className="your-class">
              <label htmlFor="From" style={{ marginTop: "-5px" }}>
                From:
              </label>
              <input
                name="From"
                type="date"
                // id="theDate"
                defaultValue={this.state.myFromDate}
              //value={this.state.myNewFromDate}
              // className="dateinput"
              // onChange={this.fromdate}
              />
              <label
                htmlFor="To"
                style={{ marginTop: "-5px", marginLeft: "5px" }}
              >
                To:
              </label>
              <input
                name="To"
                type="date"
                // id="theDate1"

                defaultValue={this.state.myToDate}
                className="dateinput"
                onChange={this.todate}
              />
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={this.refresh}
                style={{ border: "none", marginLeft: "-10px" }}
              >
                {/* <RiRefreshFill /> */}
                <i
                  className="fa fa-refresh "
                  style={{ fontSize: "15px", color: "limegreen" }}
                ></i>
              </button>
            </div>
          </section>
          <section className="content">
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",

                // backgroundColor: "red",
              }}
            >
              <div className="chart-500">
                <div className="info-box">
                  <BarCurrentStockByMaterial
                    labels={this.state.BarCurrentStockByMaterialLabels}
                    data={this.state.BarCurrentStockByMaterialData}
                  />
                </div>
              </div>
              {/* style={{ width: "48%", display: "inline-block" }} */}

              <div
                className="chart-500 marginleft "
                style={{ display: "inline-block" }}
              >
                <div className="info-box">
                  <BarCurrentStockBySubtype
                    labels={this.state.BarCurrentStockBySubtypeLabels}
                    data={this.state.BarCurrentStockBySubtypeData}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",
                // backgroundColor: "red",
              }}
            >
              <div className="chart-500">
                <div className="info-box">
                  <BarSaleQuantityByMaterial
                    labels={this.state.BarSaleQuantityByMaterialLabels}
                    data={this.state.BarSaleQuantityByMaterialData}
                  />
                </div>
              </div>
              {/* style={{ width: "48%", display: "inline-block" }} */}

              <div
                className="chart-500 marginleft"
                style={{ display: "inline-block" }}
              >
                <div className="info-box">
                  <BarSaleQuantityBySubtype
                    labels={this.state.BarSaleQuantityBySubtypeLabels}
                    data={this.state.BarSaleQuantityBySubtypeData}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",
                // backgroundColor: "red",
              }}
            >
              <div className="chart-500">
                <div className="info-box">
                  <BarSaleAmountByMaterial
                    labels={this.state.BarSaleAmountByMaterialLabels}
                    data={this.state.BarSaleAmountByMaterialData}
                  />
                </div>
              </div>
              {/* style={{ width: "48%", display: "inline-block" }} */}

              <div
                className="chart-500 marginleft"
                style={{ display: "inline-block" }}
              >
                <div className="info-box">
                  <BarSaleAmountBySubtype
                    labels={this.state.BarSaleAmountBySubtypeLabels}
                    data={this.state.BarSaleAmountBySubtypeData}
                  />
                  {/* <PieCurrentItemByStatus
                    labels={this.state.PieCurrentitemByStatusLabels}
                    data={this.state.PieCurrentitemByStatusData}
                  /> */}
                </div>
              </div>
            </div>

            {/*  chart using external Api */}
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",
                // backgroundColor: "red",
              }}
            >
              <div className="chart-500">
                <div className="info-box">
                  <BarHandheldScan
                    labels={this.state.BarHandheldScanLabels}
                    totalVals={this.state.BarHandheldScanTotalData}
                    missingVals={this.state.BarHandheldScanMissingData}
                    scannedVals={this.state.BarHandheldScanScannedData}
                  />
                </div>
              </div>
              {/* style={{ width: "48%", display: "inline-block" }} */}

              <div
                className="chart-500  marginleft"
                style={{ display: "inline-block" }}
              >
                <div className="info-box">
                  <BarHandheldInduction
                    labels={this.state.BarHandheldInductionLabels}
                    data={this.state.BarHandheldInductionData}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",
                // backgroundColor: "red",
              }}
            >
              <div className="chart-500 ">
                <div className="info-box">
                  {/* <BarSaleAmountBySubtype
                    labels={this.state.BarSaleAmountBySubtypeLabels}
                    data={this.state.BarSaleAmountBySubtypeData}
                  /> */}
                  <PieCurrentItemByStatus
                    labels={this.state.PieCurrentitemByStatusLabels}
                    data={this.state.PieCurrentitemByStatusData}
                  />
                </div>
              </div>
              <div
                className="chart-500 marginleft"
                style={{ display: "inline-block" }}
              >
                <div className="info-box">
                  <Barchart />
                </div>
              </div>
              {/* style={{ width: "48%", display: "inline-block" }} */}

              {/* <div className="chart-500  marginleft" style={{ display: "inline-block" }}>
                <div className="info-box">
                  <Linechart />
                </div>
              </div> */}
            </div>
            <div
              style={{
                maxWidth: "1100px",
                width: "95%",
                // backgroundColor: "red",
              }}
            >
              <div className="info-box chart-1075">
                <Linechart />
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

// function formatDate(date) {
//   var d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2)
//     month = '0' + month;
//   if (day.length < 2)
//     day = '0' + day;

//   return [year, month, day].join('-');
// }

// function getStartOfDate(date) {
//   return formatDate(date) + "T00:00:00.000Z";
// }

// function getEndOfDate(date) {
//   return formatDate(date) + "T23:59:59.000Z";
// }

export default Home;
