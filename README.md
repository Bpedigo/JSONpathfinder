# JSONpathfinder
A single page web app for showing JSON paths from a API
This is JavaScript code that uses the Vue.js framework to create a new Vue instance with a specific element, data, and methods. The code creates a Vue instance with the following features:
An element with the id 'app' is used as the root element for the Vue instance.
The Vue instance has data properties such as "title", "response", "pic", "apiURL", and "error" which are used to store data and update the view.
The Vue instance has a method called "getJSON" which is called when a button is clicked. The method uses the Fetch API to make a GET request to the API URL specified in the "apiURL" data property. The returned data is then passed to the function 'getPaths' or 'getPropertyPaths' depending on the type of data returned.
The 'getPaths' and 'getPropertyPaths' functions are used to extract the property paths of the returned data and store them in the "response" data property.
The 'fetchData' function is used to make the GET request and returns a promise that resolves with the JSON data from the API.
The 'checkStatus' function is used to check the status of the response from the API and returns a rejected promise if the status is not ok.
