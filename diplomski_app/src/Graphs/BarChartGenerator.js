import BarChart from "./BarChart";
import React, { useCallback, useEffect, useState } from "react";

const BarChartData = ({ BarChartData }) => {
  const [hospitalData, setHospitalData] = useState([]);
  const [roadsAndBridgesData, setRoadsAndBridgesData] = useState([]);
  const [moment, setMoment] = useState([]);

  const generateData = useCallback(() => {
    setMoment("2020-04-07 18:00:00");
    let moment = "2020-04-07 12:00:00";
    let hospitalNeighourhoods = ["1", "3", "5", "6", "9", "11", "16"];
    let roadsAndBridgesNeighbourhoods = ["1", "4", "7"];
    let valuesForHospitals = [];
    let valuesForRoadsAndBridges = [];

    class Obj {
      constructor(region, value) {
        this.region = region;
        this.value = value;
      }
    }

    for (let i = 0; i < hospitalNeighourhoods.length; i++) {
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//intervaled//1hours//interval1hours_location_" +
        hospitalNeighourhoods[i] +
        ".json");

      let myMap = new Map(Object.entries(json));

      let value = myMap.get(moment);
      let mystring = value["meanVals"];
      mystring = mystring.replace("[", "");
      mystring = mystring.replace("]", "");
      var res = mystring.split(",");
      valuesForHospitals.push(
        new Obj(hospitalNeighourhoods[i], parseFloat(res[3]))
      );
    }
    for (let i = 0; i < roadsAndBridgesNeighbourhoods.length; i++) {
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//intervaled//1hours//interval1hours_location_" +
        roadsAndBridgesNeighbourhoods[i] +
        ".json");

      let myMap = new Map(Object.entries(json));
      let value = myMap.get(moment);
      let mystring = value["meanVals"];
      mystring = mystring.replace("[", "");
      mystring = mystring.replace("]", "");
      var res = mystring.split(",");
      valuesForRoadsAndBridges.push(
        new Obj(roadsAndBridgesNeighbourhoods[i], parseFloat(res[2]))
      );
    }
    setHospitalData(valuesForHospitals);

    setRoadsAndBridgesData(valuesForRoadsAndBridges);
  }, [BarChartData]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  return (
    <React.Fragment>
      {BarChartData !== 0 ? (
        <div id="BarCharts">
          <div id="barChart1">
            <BarChart
              id={"1"}
              data={hospitalData}
              moment={moment}
              name={"Hospital"}
              color={"yellow"}
            ></BarChart>
          </div>
          <div id="barChart2">
            <BarChart
              id={"2"}
              data={roadsAndBridgesData}
              moment={moment}
              name={"Roads and bridges"}
              color={"green"}

            ></BarChart>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default BarChartData;
