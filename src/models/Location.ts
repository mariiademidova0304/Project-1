//class for the location data we're going to get from API and pass to use a Leadlet map or display on the page
export class IpMatchingLocation {
    ip: string;
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    isp: string;

    constructor( ip: string, country: string, region: string, city: string, lat: number,lng: number, postalCode: string, timezone: string, isp: string){
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