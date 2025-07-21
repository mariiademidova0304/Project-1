import { IpMatchingLocation } from "./models/Location.js";
import { fetchUserIp, fetchLocationByIp } from "./services/apiService.js";
const inputForm = document.querySelector(`.input-container`);
const ipInputField = document.getElementById(`ip-input`);
const locationDataBox = document.querySelector(`.location-data-container`);
const mapBox = document.getElementById(`map`);


inputForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    //mock if statement to check validity later
    if (true) {
        const ipToDisplay = ipInputField.value;
        fetchLocationByIp(ipToDisplay)
            .then((locationObject) => {
                const locationObjectIp = locationObject.ip;
                const locationDetails = locationObject.location;
                const locationIsp = locationObject.isp;
                return new IpMatchingLocation(locationObjectIp, locationDetails.country, locationDetails.region, locationDetails.city, locationDetails.lat, locationDetails.lng, locationDetails.postalCode, locationDetails.timezone, locationIsp);
                //console.log(`Got this data from API`);
                //console.log()
            })
            .then((myIpMatchingLocation) => console.log(myIpMatchingLocation))
            .catch(error => { console.error(error); })
            .finally(() => { console.log(`Location logged`); });
    }
})

//we're going to be fetching user's ip on page load and creating a location object
// maybe turn creating an object into a reusable function - inside location object as a method?

// fetchUserIp().then((ipString) => {
//     return fetchLocationByIp(ipString);
// })
//     .then((locationObject) => {
//     const locationObjectIp = locationObject.ip;
//     const locationDetails = locationObject.location;
//     const locationIsp = locationObject.isp;
//     return new IpMatchingLocation(locationObjectIp, locationDetails.country, locationDetails.region, locationDetails.city, locationDetails.lat, locationDetails.lng, locationDetails.postalCode, locationDetails.timezone, locationIsp);
//     //console.log(`Got this data from API`);
//     //console.log()
// })
//     .then((myIpMatchingLocation) => console.log(myIpMatchingLocation))
//     .catch(error => { console.error(error); })
//     .finally(() => { console.log(`Location logged`); });

//creating a mock instance of Location to test design and map
const testLocation = new IpMatchingLocation(
    '158.222.204.79',
    `US`,
    `NY`,
    `New York`,
    40.74844205,
    -73.9856589016075,
    `10118`,
    `-04:00`,
    `Unknown`);

//using Leaflet instructions to add the map
var ipMatchingMap = L.map('map').setView([testLocation.lat, testLocation.lng], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(ipMatchingMap);

var ipMatchingMarker = L.marker([testLocation.lat, testLocation.lng]).addTo(ipMatchingMap);




