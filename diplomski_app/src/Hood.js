import React, { useCallback, useEffect, useState } from "react";
import LineChart from "./Graphs/LineChart";

const Hood = ({ hoodData }) => {
  const [sawData, setSawData] = useState([]);
  const [powData, setPowData] = useState([]);
  const [rabData, setRabData] = useState([]);
  const [medicData, setMedicData] = useState([]);
  const [buildData, setBuildData] = useState([]);
  const [shakeData, setShakeData] = useState([]);

  const generateData = useCallback(() => {
    if (typeof hoodData["Id"] !== "undefined") {
      let sawData1 = [];
      console.log(hoodData["Id"]);
      var json = require("C://Users//NikolaKudoic//diplomski_rad//intervaled//3hours//interval3hours_location_" +
        hoodData["Id"] +
        ".json");

      console.log(json);

      let myMap = new Map(Object.entries(json));

      class Obj {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      let data = [];
      myMap.forEach(function (value, key) {
        data.push(new Obj(key, value["meanVals"]));
      });

      let powData1 = [];
      let rabData1 = [];
      let medicData1 = [];
      let buildData1 = [];
      let shakeData1 = [];
      for (let i = 0; i < data.length; i++) {
        var mystring = data[i].y;
        mystring = mystring.replace("[", "");
        mystring = mystring.replace("]", "");
        var res = mystring.split(",");

        sawData1.push(new Obj(data[i].x, res[0]));
        powData1.push(new Obj(data[i].x, res[1]));
        rabData1.push(new Obj(data[i].x, res[2]));
        medicData1.push(new Obj(data[i].x, res[3]));
        buildData1.push(new Obj(data[i].x, res[4]));
        shakeData1.push(new Obj(data[i].x, res[5]));
      }

      setSawData(sawData1);
      setPowData(powData1);
      setRabData(rabData1);
      setMedicData(medicData1);
      setBuildData(buildData1);
      setShakeData(shakeData1);
    }
  }, [hoodData]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  return (
    <React.Fragment>
        {hoodData !== 0 ? (
          <div id="linecharts" >
            <div id="linechart1">
              <LineChart id={"1"} data={sawData} color={"blue"} name={"Sewer and water"}></LineChart>
            </div>
            <div id="linechart2">
              <LineChart id={"2"} data={powData} color={"black"} name={"Power"}></LineChart>
            </div>
            <div id="linechart3">
              <LineChart id={"3"} data={rabData} color={"green"} name={"Roads and bridges"} ></LineChart>
            </div>
            <div id="linechart4">
              <LineChart id={"4"} data={medicData} color={"yellow"} name={"Medical"}></LineChart>
            </div>
            <div id="linechart5">
              <LineChart id={"5"} data={buildData} color={"purple"} name={"Buildings"}></LineChart>
            </div>
            <div id="linechart6">
              <LineChart id={"6"} data={shakeData} color={"red"} name={"Shake intensity"}></LineChart>
            </div>
          </div>
        ) : (
          ""
        )}
    </React.Fragment>
  );
};

export default Hood;
