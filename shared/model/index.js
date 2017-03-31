
import { EventEmitter } from 'events';
import { AppState } from 'react-native';
import Space from './space';

const events = new EventEmitter();
const instance = {
    on(e, l) {
        events.on(e, l);
    },

	off(e, l) {
		events.removeListener(e, l);
	},

    set api(api) {
        this._api = api;
        this.sensorValues = {};
        this.devices = [];

        this.reload();

        this._monitor();
    },

    _monitor() {
        clearInterval(this._reloader);
        this._reloader = setInterval(this.reload.bind(this), 60000);
    },

    _stopMonitoring() {
        clearInterval(this._reloader);
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

AppState.addEventListener('change', state => {
    if(state === 'background') {
        instance._stopMonitoring();
    } else {
        instance._monitor();
        instance.reload();
    }
});

export default instance;
