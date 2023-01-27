# JSONpathfinder

view the app https://bpedigo.github.io/JSONpathfinder/

This app uses Vue.js that creates a web-app that allows users to enter an endpoint URL and fetch JSON data from it. The script then displays the paths to the values contained in the JSON response, which can be used by developers to extract specific values. The script uses the Fetch API to retrieve the JSON data from the endpoint, and two helper functions, extractObjectProperties() and extractArrayProperties(), to extract the property paths and values from the JSON data. The script also includes some error handling, such as checking the status of the response and handling cases where the JSON data is not an object or an array
