
import React from 'react';
import { Text } from 'react-native';

function renderWithUnit(value, unit, options) {
	return (<Text style={{ color: options.color || null }}>{ value }
		<Text style={{ fontSize: 12, paddingLeft: 2 }}>{ unit }</Text>
	</Text>);
}

const TYPES = {
	temperature: {
		name: 'Temperature',

		color: '#7b1fa2',
		colorContrast: '#fff',
		icon: 'thermometer',

		render: (value, options) => renderWithUnit(value.value.toFixed(1), '°C', options || {})
	},

	relativeHumidity: {
		name: 'Humidity',

		color: '#00796b',
		colorContrast: '#fff',
		icon: 'water-percent',

		render: (value, options) => renderWithUnit(value.toFixed(0), '%', options || {})
	},

	airQualityIndex: {
		name: 'Air Quality Index',

		color: '#00796b',
		colorContrast: '#fff',
		icon: 'weather-windy',

		render: (value, options) => renderWithUnit(value.toFixed(0), '', options || {})
	},

	generic: {
		color: '#444',
		colorContrast: '#fff',
		icon: 'unknown'
	}
};

export default function(type) {
	return TYPES[type] || TYPES.generic;
};
