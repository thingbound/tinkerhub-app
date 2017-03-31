
import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';

import model from '../../model';
import types from './types';

export default class SensorView extends Component {
	static navigationOptions = {
		title: (navigation) => types(navigation.state.params.type).name,

		header: (navigation, defaultHeader) => {
			const type = types(navigation.state.params.type);
			return {
				...defaultHeader,
				tintColor: type.color
			}
		}
	}

	constructor(props) {
		super(props);

		console.log(props);
	}

	render() {
		const { state } = this.props.navigation;
		const space = model.space(state.params.space);

		const typeId = state.params.type;
		const type = types(typeId);
		const values = space.sensorValues('cap:' + typeId);

		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					<List containerStyle={{ marginTop: 0, marginBottom: 0 }}>
						{ values.map(sensor => <ListItem
							key={ sensor.device.id }
							title={ sensor.device.name || sensor.device.id }
							rightTitle={ type.render(sensor.values[typeId], {
								color: '#333'
							}) }
							hideChevron={ true }
							/>
						)}
					</List>
				</ScrollView>
			</View>
		);
	}
};
