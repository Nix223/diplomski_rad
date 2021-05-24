import { thresholdScott } from "d3-array";
import { create } from "d3-selection";
import React, { useEffect, useState } from "react";
import LineChart from "./Graphs/LineChart";
import LineChartGenerator from "./Graphs/LineChartGenerator";

const Hood = ({ hoodData }) => {


  useEffect(() => {

    console.log("tu sam");
    if (typeof hoodData["Id"] !== "undefined") {
      console.log(hoodData["Id"]);
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//locations//interval6hourmedian//interval6hour_location_" +
        hoodData["Id"] +
        ".json");

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

      let sawData = [];
      let powData = [];
      let rabData = [];
      let medicData = [];
      let buildData = [];
      let shakeData = [];
      for (let i = 0; i < data.length; i++) {
        var mystring = data[i].y;
        mystring = mystring.replace("[", "");
        mystring = mystring.replace("]", "");
        var res = mystring.split(",");

        sawData.push(new Obj(data[i].x, res[0]));
        powData.push(new Obj(data[i].x, res[1]));
        rabData.push(new Obj(data[i].x, res[2]));
        medicData.push(new Obj(data[i].x, res[3]));
        buildData.push(new Obj(data[i].x, res[4]));
        shakeData.push(new Obj(data[i].x, res[5]));
      }

      //ovdje me muci kak ova polja negde tu pohranit i pozvat linechartove da se ponovno iscrtaju

    }
  });

  return (
    <React.Fragment>
      <div>
        {hoodData !== 0 ? (
          <div>
            <p>{hoodData.Id}</p>

            {/* samo jednom se pozovu a trebali bi na svaki change */}
            <LineChart data={sawData} color={"blue"}>
              {" "}
            </LineChart>
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default Hood;
