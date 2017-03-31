
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import types from './types';

const styles = StyleSheet.create({
	touchable: {
		flex: 1
	},

    tile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }
})
export default class SensorTile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
		const type = types(this.props.type);

		const view = <View
			style={[ styles.tile, { backgroundColor: type.color }, this.props.style]}>
			<Icon name={ type.icon } type='material-community' size={ 40 } color={ type.colorContrast } />
			{ type.render(this.props.value, {
				color: type.colorContrast
			})}
		</View>;

		if(this.props.onPress) {
	        return <TouchableOpacity style={ styles.touchable }
					onPress={ this.props.onPress }>
				{ view }
			</TouchableOpacity>;
		} else {
			return view;
		}
    }
}
