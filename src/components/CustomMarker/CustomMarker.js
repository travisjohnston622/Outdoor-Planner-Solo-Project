import React from 'react';
import { BaseControl } from 'react-map-gl';

class CustomMarker extends BaseControl {
    // <CustomMarker lng={} lat={} />
    _render() {
        const { lng, lat } = this.props;

        const [x, y] = this._context.viewport.project([lng, lat]);

        const markerStyle = {
            position : 'absolute',
            background : '#fff',
            padding: '10px',
            left : x,
            top : y
        }

        return (
            <div ref={this._containerRef}
                style={markerStyle}>
                    {this.props.waypoint + 1}
            </div>
        )
    }
}

export default CustomMarker;