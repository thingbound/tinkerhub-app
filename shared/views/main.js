
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, SideMenu, Tabs, Tab, Icon } from 'react-native-elements'
import { TabNavigator, TabView } from 'react-navigation/lib/react-navigation.js';

import model from '../model';
import Overview from './overview';

const OverviewScreen = ({ navigation }) =>
	<Overview navigation={ navigation } />;
OverviewScreen.navigationOptions = {
	tabBar: {
		label: 'Overview',
		icon: ({ tintColor, focused }) => (
			<Icon name='view-dashboard' type='material-community' color={ tintColor } />
		)
	}
};

const LightsScreen = ({ navigation }) =>
	<Text>Lights</Text>;
LightsScreen.navigationOptions = {
	tabBar: {
		label: 'Lights',
		icon: ({ tintColor, focused }) => (
			<Icon name='lightbulb' type='material-community' color={ tintColor } />
		)
	}
};

export default TabNavigator({
	overview: {
		screen: OverviewScreen
	},

	lights: {
		screen: LightsScreen
	}
}, {
	navigationOptions: {
		title: () => model.space().name
	},

	tabBarPosition: 'bottom',
	tabBarComponent: TabView.TabBarBottom,

	tabBarOptions: {
	},
});
