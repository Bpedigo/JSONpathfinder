
const instructions = `
A web-app to extracts property paths and values from JSON data obtained from a specified endpoint.
To use it, enter the endpoint URL and click the fetch button.
The displayed info will be the paths to the values contained in the JSON response. 
These paths can be used by developers to extract specific values.
Try using these endpoints.`

new Vue({
    el: '#app',
    data: {
        title: instructions,
        response: '',
        example1: 'http://api.open-notify.org/astros.json',
        example2: 'https://geek-jokes.sameerkumar.website/api?format=json',
        example3: 'https://api.coingecko.com/api/v3/coins/list',
        apiURL: '',
        error: false
    },
    methods: {

        getJSON: function () {
            this.title = this.apiURL
            fetchData(this.apiURL)
                .then(data => {

                    if (typeof data === 'object' && data.constructor === Array) {
                        console.log("JSON begins as an array.");
                        this.response = extractArrayProperties(data)
                    } else if (typeof data === 'object') {
                        console.log("JSON begins as an object.");
                        let pathsText = extractObjectProperties(data)
                        this.response = pathsText
                    } else {
                        console.log("JSON is neither array nor an object.");
                        this.error = true
                    }
                })

            this.apiURL = ''
            this.example1 = ''
            this.example2 = ''
            this.example3 = ''
            this.error = false
            this.response = ''
        },

    }
});

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(err => console.error(err))
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function extractObjectProperties(obj, currentPath = '[$]') {

    const paths = []
    for (const key of Object.keys(obj)) {
        const value = obj[key]
        const path = `${currentPath}['${key}']`

        if (typeof value !== 'object') {
            paths.push(`${path} = ${value}`)
        } else {
            paths.push(...extractObjectProperties(value, path))
        }
    }
    return paths
}

function extractArrayProperties(arr) {
    if (!Array.isArray(arr)) return [];

    let paths = [];
    for (let i = 0; i < arr.length; i++) {
        let object = arr[i];
        let path = `$[${i}]`;
        extractProperties(object, path, paths);
    }
    return paths;
}

function extractProperties(obj, path, paths) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newPath = `${path}[${key}]`;
            if (obj[key] && typeof obj[key] === 'object') {
                extractProperties(obj[key], newPath, paths);
            } else {
                newPath = newPath + `= ${obj[key]}`
                paths.push(newPath);
            }
        }
    }
}
