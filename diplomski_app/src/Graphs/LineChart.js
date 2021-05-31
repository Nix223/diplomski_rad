import "../App.css";
import React, { useEffect, useCallback, useState } from "react";
import * as d3 from "d3";

const LineChart = (props) => {
  const [graph, setGraph] = useState(undefined);
  const makeLineChart = useCallback(() => {
    var margin = { top: 40, right: 20, bottom: 75, left: 38},
      width = 600 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    var x = d3.scaleBand().range([0, width]).padding(1);

    // var x= d3.scaleTime().range([0,width]);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    d3.select("#linechart" + props.id + "")
      .selectAll("svg")
      .remove();

    var svg = d3
      .select("#linechart" + props.id + "")
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
      props.data.map(function (d) {
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


          // text label for the x axis
    svg
    .append("text")
    .attr(
      "transform",
      "translate(" + (width+20) + " ," + (height + margin.top -10) + ")"
    )
    .style("text-anchor", "end")
    .style("font", "12px times")

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




    // Add the line
    svg
      .append("path")
      .datum(props.data)
      .attr("fill", "none")
      .attr("stroke", props.color)
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
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(props.name);
  }, [props.data]);

  useEffect(() => {
    if (props.data.length !== 0) {
      setGraph(makeLineChart());
    }
  }, [makeLineChart, props.data]);

  return (
    <React.Fragment>
      {graph !== undefined ? <div id="lineChart1">{graph}</div> : ""}
    </React.Fragment>
  );
};

export default LineChart;
