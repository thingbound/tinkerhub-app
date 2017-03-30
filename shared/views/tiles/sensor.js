
import React, { Component } from 'react';
import { View, } from 'react-native';
import { Text, Icon } from 'react-native-elements';

const BACKGROUNDS = {
    'temperature': '#7B1FA2',
    'relativeHumidity': '#00796B'
};

const FOREGROUNDS = {
    'temperature': '#fff',
    'relativeHumidity': '#fff'
};

const ICONS = {
    'temperature': 'thermometer',
    'relativeHumidity': 'water-percent'
};

export default class SensorTile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View
                style={[{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: BACKGROUNDS[this.props.type] || '#fff',
                    marginBottom: 5
                }, this.props.style]}
            >
                <Icon name={ ICONS[this.props.type] } type='material-community' size={ 40 } color={ FOREGROUNDS[this.props.type] || '#333' } />
                <Text style={{ paddingLeft: 10, color: FOREGROUNDS[this.props.type] || '#333' }}>{ this.props.value.toFixed(1) }
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>{ this.props.unit }</Text>
                </Text>
        </View>);
    }
}
