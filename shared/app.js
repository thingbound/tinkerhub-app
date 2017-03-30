import api from './api';

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, SideMenu, Tabs, Tab, Icon } from 'react-native-elements'
import NavigationBar from 'react-native-navbar';

import model from './model';

import Overview from './views/overview';

// TODO: Support for switching the API we use
model.api =  api;

const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
};

const titleConfig = {
    title: 'Living Room',
};

let screenWidth = Dimensions.get('window').width;
export default class TinkerhubApp extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: 'overview',
            menu: false,

            space: {
                id: 'home',
                name: 'Home'
            }
        };

        this._reload = () =>
            this.setState({
                space: model.space(this.space ? this.space.id : 'home')
            });
    }

    componentDidMount() {
        model.on('reload', this._reload);

        // Unmount - remove listener
    }

    changeTab(selectedTab) {
        this.state.selectedTab = selectedTab;
        this.setState(this.state);
    }

    toggleMenu(show) {
        this.setState({
            menu: (typeof show !== 'undefined' ? show : ! this.state.menu)
        });
    }

    render() {
        const MenuComponent = (
            <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
                <Text>Hello!</Text>
            </View>
        );

        const leftButtonConfig = (
            <TouchableOpacity onPress={ () => this.toggleMenu() }>
                <Icon name='home-modern' type='material-community' size={ 30 } />
            </TouchableOpacity>
        );

        const selectedTab = this.state.selectedTab;

        const makeTab = (id, name, icon, body) => {
            return (
                <Tab
                    title={ name }
                    selected={ selectedTab === id }
                    onPress={ () => this.changeTab(id) }
                    renderIcon={() => <Icon color='#5e6977' name={ icon } type='material-community' size={22} />}
                    renderSelectedIcon={() => <Icon color='#6296f9' name={ icon } type='material-community' size={22} />}
                    >
                    { body }
                </Tab>
            )
        };

        return (
            <SideMenu
                isOpen={ this.state.menu }
                onChange={this.toggleMenu.bind(this)}
                menu={ MenuComponent }>

                <View style={styles.container}>
                    <NavigationBar
                        title={{ title: this.state.space.name }}
                        leftButton={ leftButtonConfig }
                    />
                    <Tabs style={{'backgroundColor': '#fafafa'}}>
                        { makeTab('overview', 'Overview', 'view-dashboard',
                            <ScrollView>
                                <Overview space={ this.state.space } />
                                { model.devices.map(device =>
                                    <Card
                                        key={ device.id }
                                        title={ device.name || device.id }>
                                    </Card>
                                )}
                            </ScrollView>
                        )}
                        { makeTab('lights', 'Lights', 'lightbulb', <View/>) }
                        { makeTab('media', 'Media', 'play-circle-outline', <View/>) }
                    </Tabs>
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
