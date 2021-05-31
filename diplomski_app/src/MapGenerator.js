import React, { useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import request from "@arcgis/core/request";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Field from "@arcgis/core/layers/support/Field";
import Graphic from "@arcgis/core/Graphic";
import Hood from "./Hood";

const MapGenerator = () => {
  const [hoodData, setHoodData] = useState(0);

  let generateMap = (e) => {
    var portalUrl = "https://www.arcgis.com";

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
          setHoodData(content.graphic.attributes);
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

    view.zoom = 20;

    var fileName = e.target.value.toLowerCase();
    generateFeatureCollection(fileName);

    function generateFeatureCollection(fileName) {
      fileName = "MC2\\data\\StHimarkNeighborhoodShapefile.zip";
      var name = fileName.split(".");
      name = name[0].replace("c:\\fakepath\\", "");

      var params = {
        name: name,
        targetSR: view.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true,
      };

      params.generalize = true;
      params.maxAllowableOffset = 10;
      params.reducePrecision = true;
      params.numberOfDigitsAfterDecimal = 0;

      var myContent = {
        filetype: "shapefile",
        publishParameters: JSON.stringify(params),
        f: "json",
      };

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
  };

  return (
    <div id="mainWindow">
      <form encType="multipart/form-data" method="post" id="uploadForm">
        <div className="field">
          <label className="file-upload">
            <input
              type="file"
              name="file"
              id="inFile"
              onChange={(e) => {
                generateMap(e);
              }}
            />
          </label>
        </div>
      </form>
      <div id="viewDiv"></div>
      <div id="linecharts" >
      <Hood hoodData={hoodData}></Hood>
      </div>
    </div>
  );
};

export default MapGenerator;
