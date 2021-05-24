import "../App.css";
import React, { useState } from "react";
import * as d3 from "d3";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      color: this.props.color
    };

    this.makeLineChart = this.makeLineChart.bind(this);

  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidUpdate() {
    this.makeLineChart()
  }

  makeLineChart() {

    console.log(this.props.data)
    console.log(this.state.color)
    var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//locations//interval6hourmedian//interval6hour_location_1.json");
    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%s");


    let myMap = new Map(Object.entries(json));
    let X = Array.from(myMap.keys());

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

    for (let i = 0; i < data.length; i++) {
      var mystring = data[i].y;
      mystring = mystring.replace("[", "");
      mystring = mystring.replace("]", "");
      var res = mystring.split(",");

      sawData.push(new Obj(data[i].x, res[0]))
    }

    var margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // Parse the date / time


    var x = d3.scaleBand().range([0, width]).padding(1);

    // var x= d3.scaleTime().range([0,width]);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // sawData.forEach(function (d) {
    //   d.x = d.x;
    //   d.y = +d.y;
    // });

    // scale the range of the data
    x.domain(
      data.map(function (d) {
        return d.x;
      })
    );
    y.domain([0, 10]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(y);

    // Add the line
    svg
      .append("path")
      .datum(sawData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.x);
          })
          .y(function (d) {
            return y(d.y);
          })
      );
  }

  render() {
    return <div id="lineChart1">{this.makeLineChart()}</div>;
  }
}

export default LineChart;
