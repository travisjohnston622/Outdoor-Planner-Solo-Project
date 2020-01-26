import React, { Component } from 'react';
import ReactMapGL, { Layer } from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CustomMarker from '../CustomMarker/CustomMarker';


const MAPBOX_TOKEN = process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN;



const DEFAULT_VIEWPORT = {
    width: 800,
    height: 600,
    longitude: -94.5781416,
    latitude: 39.100105,
    zoom: 14
};

const ROUTE_LAYER_CONFIG = {
    'id': 'route',
    'type': 'line',
    'source': {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        }
    },
    'layout': {
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': "red",
        'line-width': 16
    }
};


class MapBox extends Component {
    state = {
        // Default Map
        viewport: DEFAULT_VIEWPORT,
        // Editor
        selectedMode: EditorModes.READ_ONLY,
        markerArray: [],
        routeLayerCoordinates: [],
        // isDrawing: false,
    };
    

    
    viewportChange = change => {
        this.setState({
            viewport: change
        }, () => {
            this.clickToPoint();
            console.log(change);
        }, () => {
            this.clickToDraw();
        });
    };

// function for editing the map with routes and plot_points
    clickMap = event => {
        console.log(event.lngLat);
        console.log('lng: ', event.lngLat[0]);
        console.log('lat: ', event.lngLat[1]);
        if (this.state.selectedMode === EditorModes.DRAW_POINT) {
            this.setState({
                markerArray: [
                    ...this.state.markerArray,
                    [event.lngLat[0], event.lngLat[1]]
                ]
            })
        } else if (this.state.selectedMode === EditorModes.DRAW_PATH)
        {
            this.setState({
                routeLayerCoordinates: [
                    ...this.state.routeLayerCoordinates,
                    [event.lngLat[0], event.lngLat[1]]
                ]
            })
        }
    }
    // markerArray: [[1,2], [2,3], [4,2]]

    //updates the map after each time the user edits it
    forceUpdate() {
        this.props.dispatch({ type: "FORCE_MAP_UPDATE_ENFORCED"});
        this.setState({
            viewport:{
            ...this.state.viewport,
            latitude: this.props.store.cordReducer.lat,
            longitude: this.props.store.cordReducer.lng
            }
        });
    }


    clickToDraw = (event) => {
        this.setState({
            selectedMode: EditorModes.DRAW_PATH
        });
    };

    clickToPoint = (event) => {
        this.setState({
            selectedMode: EditorModes.DRAW_POINT
        });
    };

    //function for overlaying routes and plot_points on the map
    makeRouteLayer() {
        const newRouteSettings = {
            ...ROUTE_LAYER_CONFIG,
        };
        newRouteSettings.source.geometry.coordinates = [
            ...this.state.routeLayerCoordinates,
        ];
        return newRouteSettings;
    }
   


    
    render() {
        if(this.props.store.cordReducer.updateNeeded){
            this.forceUpdate();
        }
        const { viewport, selectedMode } = this.state;

        const markerArray = this.state.markerArray.map((item, index) => {
            return <CustomMarker key={index} lng={item[0]} lat={item[1]} waypoint={index} />
        })

        return (
            <div>
                <div>
                    <button onClick={this.clickToDraw}>Draw Route</button>
                    <button onClick={this.clickToPoint}>Add Point</button>
                </div>
                <ReactMapGL
                    {...viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
                    onViewportChange={this.viewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={this.clickMap}
                >
                    <Editor
                        clickRadius={12}
                        mode={selectedMode}
                    />
                    {markerArray}
                    {this.state.routeLayerCoordinates.length > 0 && 
                    <Layer
                        {...this.makeRouteLayer()}
                    />}
                </ReactMapGL>
            </div>  
        );
    }
}

export default connect(mapStoreToProps)(MapBox);