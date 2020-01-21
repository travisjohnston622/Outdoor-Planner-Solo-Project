import React, { Component } from 'react';
import ReactMapGL from "react-map-gl";
import { Editor, EditorModes } from 'react-map-gl-draw';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

const MAPBOX_TOKEN = process.env.REACT_APP_PUBLIC_MAPBOX_TOKEN;

const MODES = [
    { id: EditorModes.EDITING, text: 'Select and Edit Feature' },
    { id: EditorModes.DRAW_POINT, text: 'Draw Point' },
    { id: EditorModes.DRAW_PATH, text: 'Draw Polyline' },
    { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon' },
    { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle' }
];

const DEFAULT_VIEWPORT = {
    width: 800,
    height: 600,
    longitude: -94.5781416,
    latitude: 39.100105,
    zoom: 14
};


class MapBox extends Component {
    state = {
        // Default Map
        viewport: DEFAULT_VIEWPORT,
        // Editor
        selectedMode: EditorModes.READ_ONLY
    };
    
    _switchMode = event => {
        const selectedMode = event.target.id;
        this.setState({
            selectedMode: selectedMode === this.state.selectedMode ? null : selectedMode
        });
    };
    
    viewportChange = change => {
        this.setState({
            viewport: change
        }, () => {
            console.log(change);
        });
    };

    clickMap = event => {
        console.log(event.lngLat);
        console.log('lng: ', event.lngLat[0]);
        console.log('lat: ', event.lngLat[1]);
    }

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

    _renderToolbar = () => {
        return (
            <div style={{ top: 0, right: 0, maxWidth: '320px' }}>
                <select onChange={this._switchMode}>
                    <option value="">--Please choose a mode--</option>
                    {MODES.map(mode => <option value={mode.id}>{mode.text}</option>)}
                </select>
            </div>
        );
    };

    render() {
        if(this.props.store.cordReducer.updateNeeded){
            this.forceUpdate();
        }
        const { viewport, selectedMode } = this.state;
        return (
            <ReactMapGL
                {...viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={this.viewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onClick={this.clickMap}
            >
                <Editor
                    clickRadius={12}
                    mode={selectedMode}
                />
                {/* {this._renderToolbar()} */}
            </ReactMapGL>    
        );
    }
}

export default connect(mapStoreToProps)(MapBox);