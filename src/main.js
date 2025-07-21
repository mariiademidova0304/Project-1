import { IpMatchingLocation } from "./models/Location.js";
import { fetchUserIp, fetchLocationByIp } from "./services/apiService.js";

//we're going to be fetching user's ip on page load and creating a location object
// maybe turn creating an object into a reusable function - inside location object as a method?
fetchUserIp().then((ipString) => {
    return fetchLocationByIp(ipString);
})
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
