import React, { useState } from 'react';
import scaleUtils from 'stack-utils';

class MapGenerator extends React.Component {

    generateFeatureCollection () {
        var fileName= "C:\\Users\\NikolaKudoic\\diplomski_rad\\MC2\\data\\StHimarkNeighborhoodShapefile.zip"

        var map = new Map("mapCanvas", {
          basemap: "gray",
          center: [-41.647, 36.41],
          zoom: 3,
          slider: false
        });

        var name = fileName.split(".");
        //Chrome and IE add c:\fakepath to the value - we need to remove it
        //See this link for more info: http://davidwalsh.name/fakepath

        name = name[0].replace("c:\\fakepath\\", "");

        console.log(name)

        //Define the input params for generate see the rest doc for details
        //http://www.arcgis.com/apidocs/rest/index.html?generate.html
        var params = {
          'name': name,
          'targetSR': map.spatialReference,
          'maxRecordCount': 1000,
          'enforceInputFileSizeLimit': true,
          'enforceOutputJsonSizeLimit': true
        };

        //generalize features for display Here we generalize at 1:40,000 which is approx 10 meters
        //This should work well when using web mercator.
        var extent = scaleUtils.getExtentForScale(map, 40000);
        var resolution = extent.getWidth() / map.width;
        params.generalize = true;
        params.maxAllowableOffset = resolution;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;

        var myContent = {
          'filetype': 'shapefile',
          'publishParameters': JSON.stringify(params),
          'f': 'json',
          'callback.html': 'textarea'
        };

                    //use the rest generate operation to generate a feature collection from the zipped shapefile
                    request({
                        url: portalUrl + '/sharing/rest/content/features/generate',
                        content: myContent,
                        form: dom.byId('uploadForm'),
                        handleAs: 'json',
                        load: lang.hitch(this, function (response) {
                          if (response.error) {
                            errorHandler(response.error);
                            return;
                          }
                          var layerName = response.featureCollection.layers[0].layerDefinition.name;
                          console.log(layerName)
                          dom.byId('upload-status').innerHTML = '<b>Loaded: </b>' + layerName;
                          console.log(response.featureCollection)
                          addShapefileToMap(response.featureCollection);
                          
                        }),
                        error: lang.hitch(this, errorHandler)
                      });
    }

    
    render() {
        return <div>{this.generateFeatureCollection()}</div>
    }
}

export default MapGenerator;