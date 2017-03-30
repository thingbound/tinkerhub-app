
import { EventEmitter } from 'events';
import { AppState } from 'react-native';
import Space from './space';

const events = new EventEmitter();
const instance = {
    on(e, l) {
        events.on(e, l);
    },

    set api(api) {
        this._api = api;
        this.sensorValues = {};
        this.devices = [];

        this.reload();
    },

    reload() {
        return Promise.all([
            this._api.devices.list()
                .then(devices => {
                    this.devices = devices;
                }),

            this._api.devices.call('type:sensor', 'values')
                .then(values => {
                    values.forEach(v => {
                        if(v.value) {
                            this.sensorValues[v.device.id] = v.value;
                        }
                    });
                })
        ]).then(r => events.emit('reload'));
    },

    space(id) {
        // TODO: Support for different spaces
        return new Space(this, {
            id: 'home',
            name: 'Home',
            devices: this.devices
        });
    }
};

export default instance;
