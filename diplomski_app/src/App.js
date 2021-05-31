import "./App.css";
import MapGenerator from "./MapGenerator";
import React from "react";
import HeatMap from "./Graphs/HeatMap";
import Timeline2 from "./Timeline2";
import { thresholdScott } from "d3-array";
import ScatterPlotGenerator from "./Graphs/ScatterPlotGenerator";
import BarChartGenerator from "./Graphs/BarChartGenerator";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      timeSelected: "",
      dates: [
        {
          date: "2020-04-06 00:00",
          name: "Referral date",
        },
        {
          date: "2020-04-06 06:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-06 12:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-06 18:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-07 00:00",
          name: "Referral date",
        },
        {
          date: "2020-04-07 06:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-07 12:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-07 18:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-08 00:00",
          name: "Referral date",
        },
        {
          date: "2020-04-08 06:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-08 12:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-08 18:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-09 00:00",
          name: "Referral date",
        },
        {
          date: "2020-04-09 06:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-09 12:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-09 18:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-10 00:00",
          name: "Referral date",
        },
        {
          date: "2020-04-10 06:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-10 12:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-10 18:00",
          name: "Some rando date",
        },
        {
          date: "2020-04-11 00:00",
          name: "Some rando date",
        },
      ],
      dateSelected: false,
      showCategoryMenu: false,
      showIntervalMenu:false,
      chosenCategory: "",
      chosenInterval: "",
    };
    this.toggleCategoryMenu = this.toggleCategoryMenu.bind(this);
    this.toggleIntervalMenu = this.toggleIntervalMenu.bind(this);
    this.toggleIntervalMenu = this.toggleIntervalMenu.bind(this);


  }

  toggleCategoryMenu(event) {
    event.preventDefault();

    console.log(this.state.showCategoryMenu);
    if (this.state.showCategoryMenu === false) {
      this.setState({
        showCategoryMenu: true,
      });
    } else {
      this.setState({
        showCategoryMenu: false,
      });
    }
  }

  toggleIntervalMenu(event) {
    event.preventDefault();

    console.log(this.state.showIntervalMenu);
    if (this.state.showIntervalMenu === false) {
      this.setState({
        showIntervalMenu: true,
      });
    } else {
      this.setState({
        showIntervalMenu: false,
      });
    }
  }

  handleTime = (time) => {
    this.setState({
      timeSelected: time,
    });
    this.setState({ dateSelected: true });
  };

  handleSelectedCategory(e) {
    console.log(e.target.value)
    this.setState({
      chosenCategory: e.target.value,
    })
  }

  handleSelectedInterval(e) {
    console.log(e.target.value)
    console.log(this.state.chosenInterval)
    this.setState({
      chosenInterval: e.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <MapGenerator></MapGenerator>
        <Timeline2 data={this.state.dates} onSelectTime={this.handleTime} />
        <HeatMap></HeatMap>
        <ScatterPlotGenerator moment= {"2020-04-07 18:00:00"}></ScatterPlotGenerator>
        <BarChartGenerator ></BarChartGenerator>
        <React.Fragment>
          {this.state.dateSelected !== false ? (
            <div id="menus">
              <div id = "categoryMenu">
                <button onClick={this.toggleCategoryMenu}>Choose category</button>

                {this.state.showCategoryMenu ? (
                  <div id="menu">
                    <button value={"sewer and water"} onClick ={this.handleSelectedCategory}> sewer and water </button>
                    <button value={"power"} onClick ={this.handleSelectedCategory}> power </button>
                    <button value={"roads and bridges"} onClick ={this.handleSelectedCategory}> roads and bridges </button>
                    <button value={"medical"} onClick ={this.handleSelectedCategory}> medical </button>
                    <button value={"buildings"} onClick ={this.handleSelectedCategory}> buildings </button>
                    <button value={"shake intenity"} onClick ={this.handleSelectedCategory}> shake intenity </button>
                  </div>
                ) : null}
              </div>
              <div id="intervalMenu">

                <button onClick={this.toggleIntervalMenu}>Choose time interval</button>

                {this.state.showIntervalMenu ? (
                  <div id="menu">
                    <button value={30} onClick ={this.handleSelectedInterval}> Last 30 minutes </button>
                    <button value={60} onClick ={this.handleSelectedInterval}> Last hour </button>
                    <button value={120} onClick ={this.handleSelectedInterval}> Last 2 hours </button>
                    <button value={180} onClick ={this.handleSelectedInterval}> Last 3 hours </button>
                    <button value={360} onClick ={this.handleSelectedInterval}> Last 6 hours </button>
                    <button value={720} onClick ={this.handleSelectedInterval}> Last 12 hours </button>
                    <button value={1080} onClick ={this.handleSelectedInterval}> Last 18 hours </button>

                  </div>
                ) : null}
              </div>
              <p id ="ChartDescription"> Showing 3 most critical regions for selected timestamp and category:</p>
            </div>

          ) : (
            ""
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default Main;
