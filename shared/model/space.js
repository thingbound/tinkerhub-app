
// TODO: Support for unit conversions

export default class Space {
    constructor(model, def) {
        this.model = model;
        this.id = def.id;
        this.name = def.name;

        this.devices = def.devices;
    }

    get() {
		let tags = {};
        let total = 0;
        Array.prototype.forEach.call(arguments, tag => {
            tags[tag] = true;
            total++;
        });

        return this.devices
            .filter(device => {
				let hits = 0;
	            device.tags.forEach(tag => {
	                if(tags[tag]) hits++;
	            });

	            return hits === total;
			});
    }

    _pick() {
        return this.get.apply(this, arguments)
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

    sensorValues() {
        return this.get.apply(this, arguments)
			.map(device => {
				const values = this.model.sensorValues[device.id];
				return {
					device: device,
					values: values
				};
			});
    }
}
