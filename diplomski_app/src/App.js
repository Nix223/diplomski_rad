import logo from './logo.svg';
import './App.css';
import MapGenerator from './MapGenerator';
import React from 'react';

class Main extends React.Component {

  load(e) {
    console.log("u load samu")
    console.log(e)
    var filename = e.target.value.toLowerCase();
    console.log(filename)

  }


  render() {
    return (
      <div className="App">
        <MapGenerator></MapGenerator>
      </div>
    );
  }
}

export default Main;
