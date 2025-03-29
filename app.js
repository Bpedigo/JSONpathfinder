new Vue({
    el: '#app',
    data: {
        response: '',
        example1: 'http://api.open-notify.org/astros.json',
        example2: 'https://geek-jokes.sameerkumar.website/api?format=json',
        example3: 'https://api.coingecko.com/api/v3/coins/list',
        example4: 'https://pokeapi.co/api/v2/pokemon/1', // Bulbasaur data
        apiURL: '',
        error: false,
        loading: false
    },
    methods: {
        getJSON: function () {
            this.loading = true;
            this.error = false;
            this.response = '';
            
            fetchData(this.apiURL)
                .then(data => {
                    console.log("Received data:", data); // Debug log
                    if (!data) {
                        throw new Error("No data received from the API");
                    }
                    
                    if (Array.isArray(data)) {
                        console.log("JSON is an array");
                        this.response = extractArrayProperties(data);
                    } else if (typeof data === 'object') {
                        console.log("JSON is an object");
                        this.response = extractObjectProperties(data);
                    } else {
                        console.log("JSON is neither array nor object");
                        this.error = "The response is not a valid JSON object or array";
                    }
                })
                .catch(err => {
                    console.error("Error details:", err);
                    this.error = `Error: ${err.message || 'Failed to fetch data from the API'}`;
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        copyToClipboard: function(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Show a temporary success message
                const button = event.currentTarget;
                const originalContent = button.innerHTML;
                button.innerHTML = '<i class="bi bi-check2"></i>';
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-success');
                
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('btn-success');
                    button.classList.add('btn-outline-primary');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        },

        useExample: function(url) {
            this.apiURL = url;
            this.getJSON();
        }
    }
});

function extractObjectProperties(obj, currentPath = '[$]') {
    if (!obj || typeof obj !== 'object') {
        return [];
    }

    const paths = [];
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        const path = `${currentPath}['${key}']`;

        if (value === null || value === undefined) {
            paths.push(`${path} = null`);
        } else if (typeof value !== 'object') {
            paths.push(`${path} = ${value}`);
        } else {
            paths.push(...extractObjectProperties(value, path));
        }
    }
    return paths;
}

function extractArrayProperties(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }

    let paths = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item && typeof item === 'object') {
            let path = `$[${i}]`;
            if (Array.isArray(item)) {
                paths.push(...extractArrayProperties(item));
            } else {
                paths.push(...extractObjectProperties(item, path));
            }
        }
    }
    return paths;
}

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                throw new Error("No data received from the API");
            }
            return data;
        })
        .catch(err => {
            console.error('Fetch error:', err);
            throw new Error(`Failed to fetch data: ${err.message}`);
        });
}
