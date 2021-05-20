import { Component } from 'react';
import '../App.css';
import React, { useState } from 'react';
import * as d3 from "d3";

class LineChart extends React.Component {

  constructor(props) {
      super(props);

      this.makeLineChart=this.makeLineChart.bind(this);
  }

  shouldComponentUpdate(){

      return false;
  }
  

  makeLineChart() {

      console.log("aaa");
      var data = JSON.parse(this.props.jsonData)
      var X = this.props.column1
      var Y = this.props.column2

      
      var margin = { top: 20, right: 20, bottom: 70, left: 40 },
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // Parse the date / time
      
    
      var x = d3.scaleBand().range([0, width]).padding(.05);

      var y = d3.scaleLinear().range([height, 0]);

      const line =d3.line()
      .x(function (d) { return x(d[X]); })
      .y(function (d) { return y(d[Y]); })    
      
  
      var xAxis = d3.axisBottom(x)
          

      var yAxis = d3.axisLeft(y)
          .ticks(10);


      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


      data.forEach(function (d) {
          d[X] = d[X];
          d[Y] = +d[Y];
      });

      console.log(data)

      // scale the range of the data
      x.domain(data.map(function (d) { return d[X]; }));
      y.domain([0, d3.max(data, function (d) { return d[Y]; })]);

      // add axis
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(Y);
  svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 4)
      .attr('class', 'line') 
      .attr('d', line);
  };

  render(){

      return <div>{this.makeLineChart()}</div>
  }
}


export default LineChart;