import './App.css';
import MapGenerator from './MapGenerator';
import React from 'react';
import LineChart from './Graphs/LineChart';

class Main extends React.Component {

  render() {
    return (
      <div className="App">
        <MapGenerator></MapGenerator>
      </div>
    );
  }
}

export default Main;
