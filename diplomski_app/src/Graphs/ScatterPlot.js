import { Component } from "react";
import "../App.css";
import React, { useEffect, useCallback, useState } from "react";
import * as d3 from "d3";

const ScatterPlot = (props) => {
  const [graph, setGraph] = useState(undefined);

  const makeScatterPlot = useCallback(() => {
    var margin = { top: 30, right: 20, bottom: 50, left: 38 },
      width = 550 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    d3.select("#scatterPlot" + props.id + "")
      .selectAll("svg")
      .remove();

    var svg = d3
      .select("#scatterPlot" + props.id + "")
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
    x.domain(
      props.data.map(function (d) {
        return d.time;
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

    // text label for the x axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + (width+20) + " ," + (height + margin.top -10) + ")"
      )
      .style("text-anchor", "end")
      .style("font", "15px times")

      .text("Time");


        // text label for the y axis
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font", "15px times")

  .text("Damage reported");   


    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(props.data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.time);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("r", 3)
      .style("fill", props.color);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(
        "Region id: " +
          props.data[0].id +
          " - total number of reports:" +
          props.data.length
      );
  }, [props.data]);

  useEffect(() => {
    if (props.data.length !== 0) {
      setGraph(makeScatterPlot());
    }
  }, [makeScatterPlot, props.data]);

  return (
    <React.Fragment>
      {graph !== undefined ? <div id="scatterPlot1">{graph}</div> : ""}
    </React.Fragment>
  );
};
export default ScatterPlot;
