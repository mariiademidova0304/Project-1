import { IpMatchingLocation } from "./models/Location.js";
import { fetchUserIp, fetchLocationByIp } from "./services/apiService.js";
const inputForm = document.querySelector(`.input-container`);
const ipInputField = document.getElementById(`ip-input`);
const inputError = document.getElementById(`input-error-message`);
var ipMatchingMap;

//added event listener that checks whether we've gotten a location object saved in local storage already
//if not - we'll save the one we get from user's own IP and load that on page load
//that way we don't waste our keys and just load the location we've saved
window.addEventListener(`load`, () => {
    const locationFromLocalStorage = JSON.parse(localStorage.getItem(`existingLocationToDisplay`));
    if (locationFromLocalStorage) {
        displayMap(locationFromLocalStorage);
        displayLocationData(locationFromLocalStorage);
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
                displayLocationData(myIpMatchingLocation);
            })
            .catch(error => { console.error(error); })
            .finally(() => { console.log(`Location logged`); });
    }
})

//adding custom validity check
ipInputField.addEventListener(`blur`, () => {
    if (ipInputField.validity.valueMissing) {
        ipInputField.setCustomValidity(`Please, add IP address`);
    } else if(!validateIPInput(ipInputField.value)){
        ipInputField.setCustomValidity(`Please, enter a correct IP address`)
    }    else {
        ipInputField.setCustomValidity(``);
    }
    inputError.textContent = ipInputField.validationMessage;
    if(inputError.textContent === ``){
         inputError.style.visibility = `hidden`;
    }else{
        inputError.style.visibility = `visible`;
    }
})
function validateIPInput(ipAddress){
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {  
    return true;
  } else {
  alert("Please, enter a valid IP address"); 
  return false;
  }
}


inputForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    //checking validity
    if (!inputForm.checkValidity()){
        alert(`Please, provide correct IP address`)
    } else {
         inputError.style.visibility = `hidden`;
        const ipToDisplay = ipInputField.value;
        fetchLocationByIp(ipToDisplay)
            .then((locationObject) => {
                const locationObjectIp = locationObject.ip;
                const locationDetails = locationObject.location;
                const locationIsp = locationObject.isp;
                return new IpMatchingLocation(locationObjectIp, locationDetails.country, locationDetails.region, locationDetails.city, locationDetails.lat, locationDetails.lng, locationDetails.postalCode, locationDetails.timezone, locationIsp);
            })
            .then((newIpMatchingLocation) => {
                //checking that map indeed exists already, then removing previous map and creating a new one
                if(ipMatchingMap !== undefined){
                    ipMatchingMap.remove();
                }
                    displayMap(newIpMatchingLocation);
                    //checking if data already exists inside data container
                    let dynamicallyCreatedDataSpans = document.querySelectorAll(`.location-data-container`);
                    if(dynamicallyCreatedDataSpans.length > 0){
                        //removing all the dynamically created span elements of said class
                        document.querySelectorAll(`.location-data-container`).forEach(span => span.remove());
                    }
                    displayLocationData(newIpMatchingLocation);
            })
            .catch(error => { console.error(error); })
            .finally(() => { 
                //clearing the input for IP anyway
                ipInputField.value = ``;
             });
    }
})


//using Leaflet instructions to add the map
//created a function that takes location instance as a parameter
function displayMap(locationInstance) {
    ipMatchingMap = L.map('map').setView([locationInstance.lat, locationInstance.lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(ipMatchingMap);

    var ipMatchingMarker = L.marker([locationInstance.lat, locationInstance.lng]).addTo(ipMatchingMap);
}

//creating a function that takes an array of display data and add corresponding data to array of divs
function displayLocationData(locationInstance){
    //making locationInstance an instance of location class so that we could use its method
    locationInstance = new IpMatchingLocation(locationInstance.ip, locationInstance.country, locationInstance.region, locationInstance.city, locationInstance.lat, locationInstance.lng, locationInstance.postalCode, locationInstance.timezone, locationInstance.isp);
    const locationDataDivs = document.querySelectorAll(`.location-data-wrapper`);
    const locationDataArray = locationInstance.getDataToDisplay();
locationDataDivs.forEach((locationDataDiv, index) => {
    const locationDataElement = document.createElement(`span`);
    locationDataElement.classList.add(`location-data-container`);
    locationDataElement.textContent =  locationDataArray[index];
    locationDataDiv.appendChild(locationDataElement);
})
}





