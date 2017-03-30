
import Fetcher from './fetch';
import devices from './devices';

const fetcher = new Fetcher({});

export default {
    devices: devices(fetcher)
};
