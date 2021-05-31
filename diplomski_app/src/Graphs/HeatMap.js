import "../App.css";
import React, { useState } from "react";
import * as d3 from "d3";
import { group } from "d3";

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };

    this.makeHeatChart = this.makeHeatChart.bind(this);
  }

  componentDidMount() {
    this.makeHeatChart();
  }

  makeHeatChart() {
    for (let i = 1; i <= 19; i++) {
      var json = require("C://Users//NikolaKudoic//diplomski_rad//diplomski_app//src//intervaled//1hours//interval1hours_location_" +
        i +
        ".json");

        var margin = { top: 0, right: 100, bottom: 0, left: 100 },
        width = 1200 - margin.left - margin.right,
        height = 60 - margin.top - margin.bottom;
  

      let myMap = new Map(Object.entries(json));
      let X = Array.from(myMap.keys());

      class Obj {
        constructor(time, category, value) {
          this.time = time;
          this.category = category;
          this.value = value;
        }
      }

      class Pair {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      let data = [];
      myMap.forEach(function (value, key) {
        data.push(new Pair(key, value["meanVals"]));
      });
      var dataByTime = [];
      var xValues = [];

      for (let i = 0; i < data.length; i++) {
        var mystring = data[i].y;
        mystring = mystring.replace("[", "");
        mystring = mystring.replace("]", "");
        var res = mystring.split(",");
        var category;
        for (let j = 0; j < res.length; j++) {
          switch (j) {
            case 0:
              category = "sewer and water";
              break;
            case 1:
              category = "power";
              break;
            case 2:
              category = "roads and bridges";
              break;
            case 3:
              category = "medical";
              break;
            case 4:
              category = "building";
              break;
            case 5:
              break;
          }
          dataByTime.push(new Obj(data[i].x, category, res[j].trim()));
        }

        xValues.push(data[i].x);
      }

      

      var svg = d3
        .select("div#HeatMap")
        .append("svg")
        .attr("id", i)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var groups = [
        "sewer and water",
        "power",
        "roads and bridges",
        "medical",
        "building",
      ];

      var div = d3
        .select("div#HeatMap")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var x = d3.scaleBand().range([0, width]).domain(xValues).padding(0.01);
      // Build X scales and axis:
      var y = d3.scaleBand().range([height, 0]).domain(groups).padding(0.01);

      // Build color scale
      var myColor = d3
        .scaleLinear()
        .range(["white", "firebrick"])
        .domain([1, 10]);


      var yAxis = d3.axisLeft(y);
      svg
        .append("g")
        .attr("class", "y axis")
        .attr("id", i)
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(groups);
      svg
        .selectAll()
        .data(dataByTime, function (d) {
          return d.time + ":" + d.category;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.time);
        })
        .attr("y", function (d) {
          return y(d.category);
        })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
          return myColor(d.value);
        })
        .on("mouseover", function (event, d) {
          div
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("display", "block");
          div
            .html("<br/>" + d.value)
            .style("display", "block")

            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (d) {
          div.transition().duration(500).style("opacity", 0);
        });
      svg
        .append("text")
        .attr("x", width)
        .attr("y", 45)
        .attr("text-anchor", "right")
        .style("font-size", "10px")
        .text("Region: " + i);
    }
  }

  render() {
    return <div id={"HeatMap"}></div>;
  }
}

export default HeatMap;
