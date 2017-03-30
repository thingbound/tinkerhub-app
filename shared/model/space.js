
// TODO: Support for unit conversions

export default class Space {
    constructor(model, def) {
        this.model = model;
        this.id = def.id;
        this.name = def.name;

        this.devices = def.devices;
    }

    _pick(tag) {
        return this.devices
            .filter(device => device.tags.indexOf(tag) >= 0)
            .map(device => this.model.sensorValues[device.id]);
    }

    get temperature() {
        const values = this._pick('cap:temperature')
            .map(values => values.temperature)
            .filter(value => typeof value !== 'undefined');
        const sum = values.reduce((p, c) => p + c.value, 0);
        return {
            value: sum / values.length,
            unit: 'C'
        };
    }

    get relativeHumidity() {
        const values = this._pick('cap:relativeHumidity')
            .map(values => values.relativeHumidity)
            .filter(value => typeof value !== 'undefined');
        const sum = values.reduce((p, c) => p + c, 0);
        return sum / values.length;
    }
}
