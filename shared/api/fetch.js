

function check(response) {
    if(response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }

    return response;
}

function json(response) {
    return response.json();
}

export default function create(options) {
    const root = options.root || '/';
    return {
        get(url, params) {
            return fetch(root + 'v1/' + url)
                .then(check)
                .then(json);
        }
    };
};
