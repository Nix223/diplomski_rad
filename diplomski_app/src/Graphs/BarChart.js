import { Component } from "react";
import "../App.css";
import React, { useEffect, useCallback, useState } from "react";
import * as d3 from "d3";

const BarChart = (props) => {
  const [graph, setGraph] = useState(undefined);

  const makeBarChart = useCallback(() => {
      console.log("U bar chartu")
      console.log(props.data)
    var margin = { top: 30, right: 20, bottom: 50, left: 40 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    d3.select("#barChart" + props.id + "")
      .selectAll("svg")
      .remove();


    var svg = d3
      .select("#barChart" + props.id + "")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleBand().range([0, width]).padding(1);

    // Add Y axis
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);
    // scale the range of the data

    props.data.forEach(function (d) {
      d.value = +d.value;
    });
    x.domain(
      props.data.map(function (d) {
        return d.region;
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
      .attr("dx", "+.3em");

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

    // text label for the x axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + (width + 15) + " ," + (height + margin.top) + ")"
      )
      .style("text-anchor", "end")
      .style("font", "12px times")

      .text("Region id");

    // text label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font", "15px times")

      .text("Damage reported");

    // Add bar chart
    svg
      .selectAll("bar")
      .data(props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.region) - 20;
      })
      .attr("width", 40)
      .attr("y", function (d) {
        return y(d.value);
      })

      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", props.color);

      console.log(props.name)
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text( props.name+" damage at: " + props.moment);
  }, [props.data]);

  useEffect(() => {
    if (props.data.length !== 0) {
      setGraph(makeBarChart());
    }
  }, [makeBarChart, props.data]);

  return (
    <React.Fragment>
      {graph !== undefined ? <div id="barChart1">{graph}</div> : ""}
    </React.Fragment>
  );
};
export default BarChart;
