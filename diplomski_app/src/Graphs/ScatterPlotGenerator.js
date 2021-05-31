import { Component } from "react";
import "../App.css";
import * as d3 from "d3";
import ScatterPlot from "./ScatterPlot";
import React, { useCallback, useEffect, useState } from "react";

const ScatterPlotData = ({ ScatterPlotData }) => {
  const [riskyRegionsData0, setRiskyRegionsData0] = useState([]);
  const [riskyRegionsData1, setRiskyRegionsData1] = useState([]);
  const [riskyRegionsData2, setRiskyRegionsData2] = useState([]);
  const [color, setColor] = useState(null);

  const generateData = useCallback(() => {
    var dates = {
      convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return d.constructor === Date
          ? d
          : d.constructor === Array
          ? new Date(d[0], d[1], d[2])
          : d.constructor === Number
          ? new Date(d)
          : d.constructor === String
          ? new Date(d)
          : typeof d === "object"
          ? new Date(d.year, d.month, d.date)
          : NaN;
      },
      compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return isFinite((a = this.convert(a).valueOf())) &&
          isFinite((b = this.convert(b).valueOf()))
          ? (a > b) - (a < b)
          : NaN;
      },
      inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return isFinite((d = this.convert(d).valueOf())) &&
          isFinite((start = this.convert(start).valueOf())) &&
          isFinite((end = this.convert(end).valueOf()))
          ? start <= d && d <= end
          : NaN;
      },
    };
    let valuesForRegions = [];
    let moment = "2020-04-07 18:00:00";
    let interval = 360;
    let category = "power";
    let riskyRegions = [];

    for (let i = 1; i <= 19; i++) {
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//intervaled//1hours//interval1hours_location_" +
        i +
        ".json");

      let myMap = new Map(Object.entries(json));
      let value = myMap.get(moment);
      valuesForRegions[i] = value["meanVals"];
    }
    let color
    let specificValues = [];
    for (let i = 1; i <= 19; i++) {
      var mystring = valuesForRegions[i];
      mystring = mystring.replace("[", "");
      mystring = mystring.replace("]", "");
      var res = mystring.split(",");
      if (category === "sewer and water") {
        specificValues[i] = parseFloat(res[0]);
        setColor("blue")
      } else if (category == "power") {
        specificValues[i] = parseFloat(res[1]);
        setColor("black")
      } else if (category == "roads and bridges") {
        specificValues[i] = parseFloat(res[2]);
        setColor("green")
      } else if (category == "medical") {
        specificValues[i] = parseFloat(res[3]);
        setColor("yellow")

      } else if (category == "buildings") {
        specificValues[i] = parseFloat(res[4]);
        setColor("purple")

      } else if (category == "shake intensity") {
        specificValues[i] = parseFloat(res[5]);
        setColor("red")

      }
    }

    getMostRisky(specificValues);
    function getMostRisky(specificValues) {
      while (riskyRegions.length < 3) {
        let max = 0;
        let regionid = 0;
        for (let i = 1; i <= 19; i++) {
          if (specificValues[i] >= max) {
            max = specificValues[i];
            regionid = i;
          }
        }
        riskyRegions.push(regionid);
        specificValues[regionid] = 0;
      }
    }

    Date.prototype.decreaseHours = function (h) {
      this.setTime(this.getTime() - h * 60 * 60 * 1000);
      return this;
    };

    let hours = interval / 60;
    var to = new Date(moment);
    var from = to.decreaseHours(hours);
    var to = new Date(moment);
    var to2 = dates.convert(to);
    var from2 = dates.convert(from);

    class Obj {
      constructor(id, time, value) {
        this.id = id;
        this.time = time;
        this.value = value;
      }
    }
    let requiredValues0 = [];
    let requiredValues1 = [];
    let requiredValues2 = [];


    for (let i = 0; i < riskyRegions.length; i++) {
      var n = riskyRegions[i].toString();
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//locations//loc_sorted" +
        n +
        ".json");
      let myMap = new Map(Object.entries(json));
      for (let value of myMap.values()) {
        let currentDate = dates.convert(value["time"]);
        if (dates.inRange(currentDate, from2, to2)) {
          if (i === 0) {
            requiredValues0.push(
              new Obj(n,value["time"], value["sewer_and_water"])
            );
          } else if (i === 1) {
            requiredValues1.push(
              new Obj(n,value["time"], value["sewer_and_water"])
            );
          } else {
            requiredValues2.push(
              new Obj(n,value["time"], value["sewer_and_water"])
            );
          }
        }
      }
    }
    setRiskyRegionsData0(requiredValues0);
    setRiskyRegionsData1(requiredValues1);
    setRiskyRegionsData2(requiredValues2);
  }, [ScatterPlotData]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  return (
    <React.Fragment>
      {ScatterPlotData !== 0 ? (
        <div id="scatterPlots">
          <div id="scatterPlot1">
            <ScatterPlot
              id={"1"}
              data={riskyRegionsData0}
              color={color}
            ></ScatterPlot>
          </div>
          <div id="scatterPlot2">
            <ScatterPlot
              id={"2"}
              data={riskyRegionsData1}
              color={color}
            ></ScatterPlot>
          </div>
          <div id="scatterPlot3">
            <ScatterPlot
              id={"3"}
              data={riskyRegionsData2}
              color={color}
            ></ScatterPlot>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ScatterPlotData;
