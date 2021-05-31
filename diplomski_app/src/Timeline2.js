import React from "react";

require("./Timeline.css");

var moment = require("moment");
var _ = require("lodash");

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 100;
const SVG_VERTICAL_PADDING = 100;
const SVG_WORKING_WIDTH = SVG_WIDTH - SVG_VERTICAL_PADDING * 2;

function hourToLabel(date) {
  return moment(date).format("HH:mm").toUpperCase();
}

function dateToLabel(date) {
  return moment(date).format("YYYY.MM.DD.").toUpperCase();
}

function sortDataByDates(dates) {
  return _.sortBy(dates, "date");
}

function diffHoursBetweenDates(firstDate, lastDate) {
  return moment(lastDate).diff(moment(firstDate), "hours");
}

function transformTranslate(x, y) {
  return `translate(${x},${y})`;
}

function labelGroupPos(dataArray, groupIndex) {
  let widthInterval =
    SVG_WORKING_WIDTH /
    diffHoursBetweenDates(
      dataArray[0].date,
      dataArray[dataArray.length - 1].date
    );

  if (dataArray[groupIndex - 1] === undefined) {
    return -26;
  } else {
    let totalMonthsSoFar = diffHoursBetweenDates(
      dataArray[0].date,
      dataArray[groupIndex - 1].date
    );
    let monthsBetweenThisDateAndLast = diffHoursBetweenDates(
      dataArray[groupIndex - 1].date,
      dataArray[groupIndex].date
    );
    return (
      (totalMonthsSoFar + monthsBetweenThisDateAndLast) * widthInterval - 26
    );
  }
}

const Circle = ({ x, y }) => (
  <path
    transform={transformTranslate(x, y)}
    d="M7 12c2.76 0 5-2.24 5-5S9.76 2 7 2 2 4.24 2 7s2.24 5 5 5z"
    strokeOpacity=".492"
    stroke="#2A2A2A"
    strokeWidth=".5"
    fill="#fff"
    fillRule="evenodd"
    onClick={console.log(x)}
  />
);

Circle.props = {
  x: 0,
  y: 0,
};

const Label = ({ value }) => (
  <text x={20} y={58} fontFamily="Verdana" fontSize="8" width="100%">
    {hourToLabel(value)}
  </text>
);


export default class TimelineComponent extends React.Component {

  handleEvent =(time) => {
    this.props.onSelectTime(time);            
  }

  render() {
    let sortedData = sortDataByDates(this.props.data);
    let sortedDataUniqByDate = _.uniq(sortedData, "date");
    function translateX(x) {
      return `translate(${x},0)`;
    }

    let dayMarkers = [];
    let y = 4;
    let x = 75;
    for (let i = 0; i < 20; i = i + 4) {
      dayMarkers.push(
        <text x={x} y="15">
          {dateToLabel(sortedDataUniqByDate[i].date)}
        </text>
      );
      x += 200;
    }
    let monthMarkers = [];
    let hoursBetweenExtremes = diffHoursBetweenDates(
      sortedData[0].date,
      sortedData[sortedData.length - 1].date
    );

    let cnt = 0;
    let hours = [
      "2020-04-06 00:00",
      "2020-04-06 01:00",
      "2020-04-06 02:00",
      "2020-04-06 03:00",
      "2020-04-06 04:00",
      "2020-04-06 05:00",
      "2020-04-06 06:00",
      "2020-04-06 07:00",
      "2020-04-06 08:00",
      "2020-04-06 09:00",
      "2020-04-06 10:00",
      "2020-04-06 11:00",
      "2020-04-06 12:00",
      "2020-04-06 13:00",
      "2020-04-06 14:00",
      "2020-04-06 15:00",
      "2020-04-06 16:00",
      "2020-04-06 17:00",
      "2020-04-06 18:00",
      "2020-04-06 19:00",
      "2020-04-06 20:00",
      "2020-04-06 21:00",
      "2020-04-06 22:00",
      "2020-04-06 23:00",
      "2020-04-07 00:00",
      "2020-04-07 01:00",
      "2020-04-07 02:00",
      "2020-04-07 03:00",
      "2020-04-07 04:00",
      "2020-04-07 05:00",
      "2020-04-07 06:00",
      "2020-04-07 07:00",
      "2020-04-07 08:00",
      "2020-04-07 09:00",
      "2020-04-07 10:00",
      "2020-04-07 11:00",
      "2020-04-07 12:00",
      "2020-04-07 13:00",
      "2020-04-07 14:00",
      "2020-04-07 15:00",
      "2020-04-07 16:00",
      "2020-04-07 17:00",
      "2020-04-07 18:00",
      "2020-04-07 19:00",
      "2020-04-07 20:00",
      "2020-04-07 21:00",
      "2020-04-07 22:00",
      "2020-04-07 23:00",
      "2020-04-08 00:00",
      "2020-04-08 01:00",
      "2020-04-08 02:00",
      "2020-04-08 03:00",
      "2020-04-08 04:00",
      "2020-04-08 05:00",
      "2020-04-08 06:00",
      "2020-04-08 07:00",
      "2020-04-08 08:00",
      "2020-04-08 09:00",
      "2020-04-08 10:00",
      "2020-04-08 11:00",
      "2020-04-08 12:00",
      "2020-04-08 13:00",
      "2020-04-08 14:00",
      "2020-04-08 15:00",
      "2020-04-08 16:00",
      "2020-04-08 17:00",
      "2020-04-08 18:00",
      "2020-04-08 19:00",
      "2020-04-08 20:00",
      "2020-04-08 21:00",
      "2020-04-08 22:00",
      "2020-04-08 23:00",
      "2020-04-09 00:00",
      "2020-04-09 01:00",
      "2020-04-09 02:00",
      "2020-04-09 03:00",
      "2020-04-09 04:00",
      "2020-04-09 05:00",
      "2020-04-09 06:00",
      "2020-04-09 07:00",
      "2020-04-09 08:00",
      "2020-04-09 09:00",
      "2020-04-09 10:00",
      "2020-04-09 11:00",
      "2020-04-09 12:00",
      "2020-04-09 13:00",
      "2020-04-09 14:00",
      "2020-04-09 15:00",
      "2020-04-09 16:00",
      "2020-04-09 17:00",
      "2020-04-09 18:00",
      "2020-04-09 19:00",
      "2020-04-09 20:00",
      "2020-04-09 21:00",
      "2020-04-09 22:00",
      "2020-04-09 23:00",
      "2020-04-10 00:00",
      "2020-04-10 01:00",
      "2020-04-10 02:00",
      "2020-04-10 03:00",
      "2020-04-10 04:00",
      "2020-04-10 05:00",
      "2020-04-10 06:00",
      "2020-04-10 07:00",
      "2020-04-10 08:00",
      "2020-04-10 09:00",
      "2020-04-10 10:00",
      "2020-04-10 11:00",
      "2020-04-10 12:00",
      "2020-04-10 13:00",
      "2020-04-10 14:00",
      "2020-04-10 15:00",
      "2020-04-10 16:00",
      "2020-04-10 17:00",
      "2020-04-10 18:00",
      "2020-04-10 19:00",
      "2020-04-10 20:00",
      "2020-04-10 21:00",
      "2020-04-10 22:00",
      "2020-04-10 23:00",
      "2020-04-11 00:00",

    ];
    for (var i = -1; i < hoursBetweenExtremes; i++) {
      let height = 15;
      if (cnt % 6 == 0) {
        height = 25;
      }
      if (hoursBetweenExtremes != 0) {
        monthMarkers.push(
          <rect
            width={2.5}
            height={height}
            y={25}
            fill={"#000000"}
            x={(SVG_WORKING_WIDTH / hoursBetweenExtremes) * (i + 1)}
            key={i}
            style={{ cursor: "pointer", pointerEvents: "bounding-box" }}
            onClick={this.handleEvent.bind(hours[i + 1], hours[i + 1])}
          />
        );
        cnt++;
      }
    }
    return (
      <div id="Timeline" style={{ position: "relative", height: "80px" }}>
        <p id="heatMapDescription">HeatMap showing distribution of reported damage per region over time.</p>
        <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
          <script type="text/JavaScript"></script>
          <g transform={translateX(SVG_VERTICAL_PADDING)}>
            {dayMarkers}

            <rect width={SVG_WORKING_WIDTH} height={1} y={25} />
            {sortedDataUniqByDate.map((date, index) => {
              return (
                <g
                  transform={translateX(
                    labelGroupPos(sortedDataUniqByDate, index)
                  )}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <Label
                    value={date.date}
                    index={index}
                    uniqueLabelsCount={sortedDataUniqByDate.length}
                  />
                </g>
              );
            })}
            {monthMarkers}
          </g>
        </svg>
      </div>
    );
  }
}
