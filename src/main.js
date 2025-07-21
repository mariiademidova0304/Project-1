import { IpMatchingLocation } from "./models/Location.js";
import { fetchUserIp, fetchLocationByIp } from "./services/apiService.js";
const inputForm = document.querySelector(`.input-container`);
const ipInputField = document.getElementById(`ip-input`);
const locationDataBox = document.querySelector(`.location-data-container`);
const mapBox = document.getElementById(`map`);

//added event listener that checks whether we've gotten a location object saved in local storage already
//if not - we'll save the one we get from user's own IP and load that on page load
//that way we don't waste our keys and just load the location we've saved
window.addEventListener(`load`, () => {
    const locationFromLocalStorage = JSON.parse(localStorage.getItem(`existingLocationToDisplay`));
    if (locationFromLocalStorage) {
        displayMap(locationFromLocalStorage);
    } else {
        fetchUserIp().then((ipString) => {
            return fetchLocationByIp(ipString);
        })
            .then((locationObject) => {
                const locationObjectIp = locationObject.ip;
                const locationDetails = locationObject.location;
                const locationIsp = locationObject.isp;
                return new IpMatchingLocation(locationObjectIp, locationDetails.country, locationDetails.region, locationDetails.city, locationDetails.lat, locationDetails.lng, locationDetails.postalCode, locationDetails.timezone, locationIsp);
            })
            .then((myIpMatchingLocation) => {
                //saving to local storage
                localStorage.setItem(`existingLocationToDisplay`, JSON.stringify(myIpMatchingLocation));
                displayMap(myIpMatchingLocation);
            })
            .catch(error => { console.error(error); })
            .finally(() => { console.log(`Location logged`); });
    }
})

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
// const testLocation = new IpMatchingLocation(
//     '158.222.204.79',
//     `US`,
//     `NY`,
//     `New York`,
//     40.74844205,
//     -73.9856589016075,
//     `10118`,
//     `-04:00`,
//     `Unknown`);

//using Leaflet instructions to add the map
//created a function that takes location instance as a parameter
function displayMap(locationInstance) {
    var ipMatchingMap = L.map('map').setView([locationInstance.lat, locationInstance.lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(ipMatchingMap);

    var ipMatchingMarker = L.marker([locationInstance.lat, locationInstance.lng]).addTo(ipMatchingMap);
}






