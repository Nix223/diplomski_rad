import React from "react";
import Basemap from "@arcgis/core/Basemap";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import request from "@arcgis/core/request";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Field from "@arcgis/core/layers/support/Field";
import Graphic from "@arcgis/core/Graphic";

export default class MapGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.testing = this.testing.bind(this);
    this.generateMap = this.generateMap.bind(this);
  }
  testing() {
    console.log(document.getElementById("mainWindow"));
    console.log(document.getElementById("uploadForm"));
  }

  hasChanged(e) {
    this.generateMap(e)
  }

  generateMap(e) {
    console.log("nesto2")

    var portalUrl = "https://www.arcgis.com";
    console.log(document.getElementById("uploadForm"));

    var map = new Map({
      basemap: "gray",
    });

    var view = new MapView({
      center: [-41.647, 36.41],
      map: map,
      container: "viewDiv",
      popup: {
        defaultPopupTemplateEnabled: true,
      },
      ui: {
        components: ["attribution"],
      },
    });

    view.on("click", function (event) {
      var popup = view.popup;
      setTimeout(() => {
        var content = popup.content;
        if (content != null) {
          console.log(content.graphic.attributes);
        }
      }, 100);
    });

    view.on("mouse-wheel", function (event) {
      event.stopPropagation();
    });
    view.on("double-click", function (event) {
      event.stopPropagation();
    });

    view.on("double-click", ["Control"], function (event) {
      event.stopPropagation();
    });
    view.on("drag", function (event) {
      event.stopPropagation();
    });

    view.zoom = 20; // Sets the zoom LOD to 13

    var fileForm = document.getElementById("mainWindow");

    var fileName = e.target.value.toLowerCase();
    generateFeatureCollection(fileName)

    function generateFeatureCollection(fileName) {
      fileName = "MC2\\data\\StHimarkNeighborhoodShapefile.zip";
      var name = fileName.split(".");
      // Chrome and IE add c:\fakepath to the value - we need to remove it
      // see this link for more info: http://davidwalsh.name/fakepath
      name = name[0].replace("c:\\fakepath\\", "");

      // define the input params for generate see the rest doc for details
      // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
      var params = {
        name: name,
        targetSR: view.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true,
      };

      // generalize features to 10 meters for better performance
      params.generalize = true;
      params.maxAllowableOffset = 10;
      params.reducePrecision = true;
      params.numberOfDigitsAfterDecimal = 0;

      var myContent = {
        filetype: "shapefile",
        publishParameters: JSON.stringify(params),
        f: "json",
      };

      // use the REST generate operation to generate a feature collection from the zipped shapefile
      request(portalUrl + "/sharing/rest/content/features/generate", {
        query: myContent,
        body: document.getElementById("uploadForm"),
        responseType: "json",
      }).then(function (response) {
        var layerName =
          response.data.featureCollection.layers[0].layerDefinition.name;
        addShapefileToMap(response.data.featureCollection);
      });
    }
    function addShapefileToMap(featureCollection) {
      let renderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        field: "Color",
        defaultSymbol: { type: "simple-fill" }, // autocasts as new SimpleFillSymbol()
        uniqueValueInfos: [
          {
            value: "0",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "white",
            },
          },
          {
            value: "1",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#fee0d2",
            },
          },
          {
            value: "2",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#fcbba1",
            },
          },
          {
            value: "3",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#fb6a4a",
            },
          },
          {
            value: "4",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#cb181d",
            },
          },
          {
            value: "5",
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: "#a50f15",
            },
          },
        ],
      };
      // add the shapefile to the map and zoom to the feature collection extent
      // if you want to persist the feature collection when you reload browser, you could store the
      // collection in local storage by serializing the layer using featureLayer.toJson()
      // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
      var sourceGraphics = [];

      var layers = featureCollection.layers.map(function (layer) {
        var graphics = layer.featureSet.features.map(function (feature) {
          return Graphic.fromJSON(feature);
        });
        sourceGraphics = sourceGraphics.concat(graphics);

        var featureLayer = new FeatureLayer({
          objectIdField: "FID",
          source: graphics,
          renderer: renderer,
          outField: "Color",

          fields: layer.layerDefinition.fields.map(function (field) {
            return Field.fromJSON(field);
          }),
        });
        return featureLayer;
      });
      map.addMany(layers);
      view.goTo(sourceGraphics).catch(function (error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    }
  }

  render() {
    return (
      <div id="mainWindow">
        <div>
          <div>
            <form
              encType="multipart/form-data"
              method="post"
              id="uploadForm">
              <div className="field">
                <label className="file-upload">
                  <input type="file" name="file" id="inFile"  onChange={(e) => { this.hasChanged(e) }} />
                </label>
              </div>
            </form>

          </div>
          <div id="viewDiv"></div>

        </div>
      </div>
    );
  }
}
