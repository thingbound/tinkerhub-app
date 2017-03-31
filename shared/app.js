import api from './api';

import React, { Component } from 'react';
import { View } from 'react-native';

// Link directly to JS-file as there is a .web.js that is for normal React
import { StackNavigator } from 'react-navigation/lib/react-navigation.js';

import Main from './views/main';
import SensorOverview from './views/sensor/overview';

import model from './model';

// TODO: Support for switching the API we use
model.api =  api;

const App = StackNavigator({
	Home: {
		screen: Main
	},

	SensorOverview: {
		path: ':space/sensor/:type',
		screen: SensorOverview
	}
});

export default App;
