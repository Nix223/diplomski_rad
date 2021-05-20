import React from 'react';
import Basemap from "@arcgis/core/Basemap";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";



export default class MapGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.testing=this.testing.bind(this);

    };
    testing() {
        console.log(document.getElementById('uploadForm'))
    }

    render(){

        return <div>{this.testing()}</div>
    }

}