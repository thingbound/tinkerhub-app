
import React, { Component } from 'react';
import { Text, View, } from 'react-native';

import SensorTile from './tiles/sensor';

export default class Overview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const space = this.props.space;

        const temperature = space.temperature;
        const relativeHumidity = space.relativeHumidity;

        return (
            <View style={{ margin: 2.5, flexDirection: 'row' }}>
                { typeof temperature === 'undefined' ? null : <SensorTile style={{ margin: 2.5 }} title='Temperature' type='temperature' value={ temperature.value } unit={ temperature.unit } /> }
                { typeof relativeHumidity === 'undefined' ? null : <SensorTile style={{ margin: 2.5 }} title='Humidity' type='relativeHumidity' value={ relativeHumidity } unit='%' /> }
            </View>
        );
    }
}
