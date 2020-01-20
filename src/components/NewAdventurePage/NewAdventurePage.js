import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ReactMapGL from 'react-map-gl';
import { RenderStates } from 'react-map-gl-draw';


class NewAdventurePage extends Component {

    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        }
    };

//     getEditHandleStyle({ feature, state }) {
//     switch (state) {
//         case RenderStates.SELECTED:
//         case RenderStates.HOVERED:
//         case RenderStates.UNCOMMITTED:
//             return {
//                 fill: 'rgb(251, 176, 59)',
//                 fillOpacity: 1,
//                 stroke: 'rgb(255, 255, 255)',
//                 strokeWidth: 2,
//                 r: 7
//             };

//         default:
//             return {
//                 fill: 'rgb(251, 176, 59)',
//                 fillOpacity: 1,
//                 stroke: 'rgb(255, 255, 255)',
//                 strokeWidth: 2,
//                 r: 5
//             };
//     }
// }

// getFeatureStyle({ feature, index, state }) {
//     switch (state) {
//         case RenderStates.SELECTED:
//         case RenderStates.HOVERED:
//         case RenderStates.UNCOMMITTED:
//         case RenderStates.CLOSING:
//             return {
//                 stroke: 'rgb(251, 176, 59)',
//                 strokeWidth: 2,
//                 fill: 'rgb(251, 176, 59)',
//                 fillOpacity: 0.3,
//                 strokeDasharray: '4,2'
//             };

//         default:
//             return {
//                 stroke: 'rgb(60, 178, 208)',
//                 strokeWidth: 2,
//                 fill: 'rgb(60, 178, 208)',
//                 fillOpacity: 0.1
//             };
//     }
// }

    render() {
        return (
        <div>
            <ReactMapGL
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
            />
            <ReactMapGL mapBoxApiAccessToken= {mapBoxToken} />
        </div>
        );
    }
}

export default connect(mapStoreToProps)(NewAdventurePage);
