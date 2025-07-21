import { IpMatchingLocation } from "./models/Location";
import { fetchUserIp, fetchLocationByIp } from "./services/apiService";

fetchUserIp().then(
    (ipString) => {
        return fetchLocationByIp(ipString)})
        .then(
            (locationObject) => {
                //don't really need this line as we'll be getting IP from input/user's own ip
                const locationObjectIp = locationObject.ip;
                const locationDetails = locationObject.location;
                const locationIsp = locationObject.isp;
                return new IpMatchingLocation(locationObjectIp, locationDetails.country, locationDetails.region, locationDetails.city, locationDetails.lat, locationDetails.lng, locationDetails.postalCode, locationDetails.timezone, locationIsp);
                //console.log(`Got this data from API`);
                //console.log()
            }
        )
    .then((myIpMatchingLocation) => console.log(myIpMatchingLocation))
    .catch(error => { console.error(error) })
    .finally(() => { console.log(`Location logged`) })