import { create } from "d3-selection";
import React, { useState } from "react";
import LineChart from "./LineChart";

class LineChartGenerator extends React.Component {
    
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.updateState= this.updateState.bind(this)
  }


componentDidMount() {
    this.loadData()
}

componentDidUpdate() {
    this.loadData()
}

  loadData() {
    console.log(this.props.data)
    console.log("tu sam")
    var props = this.props.data;

    var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//locations//interval6hourmedian//interval6hour_location_" +
      props["Id"] +
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

    //zapetlja se ovdje jer si svaki put promijeni state pa to opet napravi componentDidUpdate()
    //ne znam kako drugacije updetat taj state pa da se propagira ovim line chartovima
    // this.updateState(sawData,powData,rabData,medicData,buildData,shakeData)


}

    updateState(sawData, powData, rabData,medicData, buildData, shakeData) {
        this.setState({
            sawData:sawData,
            powData:powData,
            rabData:rabData,
            medicData:medicData,
            buildData:buildData,
            shakeData:shakeData,

        })

    }


  

  render() {
    return (
      <div id="linecharts">
        <LineChart data={this.state.sawData} color={"blue"}>LineChart</LineChart>
      </div>
    );
  }
}

export default LineChartGenerator;
