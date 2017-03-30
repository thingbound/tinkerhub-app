
class Device {
    constructor(owner, def) {
        this._owner = owner;

        this.id = def.id;
        this.name = def.name;
        this.tags = def.tags;

        // TODO: Do we need information about actions?
    }

    call(action, args) {
        return this.owner.call(this.id, action, args)
            .then(result => {
                const r = result[0];
                if(r.error) {
                    throw new Error(r.error);
                }

                return r.value;
            });
    }
}

export default function(fetcher) {
    return {
        list() {
            const self = this;
            return fetcher.get('devices')
                .then(devices => devices.map(d => new Device(self, d)));
        },

        call(tags, action, args) {
            const merged = Array.isArray(tags) ? tags.join(',') : tags;
            return fetcher.get('devices/' + tags + '/call/' + action);
        }
    };
};
