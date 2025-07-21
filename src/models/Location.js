//class for the location data we're going to get from API and pass to use a Leadlet map or display on the page
export class IpMatchingLocation {
    constructor(ip, country, region, city, lat, lng, postalCode, timezone, isp) {
        this.ip = ip;
        this.country = country;
        this.region = region;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
        this.postalCode = postalCode;
        this.timezone = timezone;
        this.isp = isp;
    }
}
