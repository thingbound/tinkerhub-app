
import React, { Component } from 'react';
import { Text, View, } from 'react-native';

import SensorTile from './sensor/tile';

import ModelAwareComponent from './component';

export default class Overview extends ModelAwareComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const space = this.model.space();

        const makeSensorTile = (type) => {
            const value = space[type];
            if(typeof value === 'undefined') return;

            return (
                <SensorTile style={{ margin: 2.5 }}
                    onPress={ () => this.props.navigation.navigate('SensorOverview', {
                        space: space.id,
                        type: type
                    })}
                    type={ type }
                    value={ value } />
            );
        };

        return (
            <View style={{ margin: 2.5, flexDirection: 'row' }}>
                { makeSensorTile('temperature') }
                { makeSensorTile('relativeHumidity') }
            </View>
        );
    }
}
