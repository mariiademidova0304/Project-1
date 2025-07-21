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
        this.postalCode = postalCode || `unknown`;
        this.timezone = timezone;
        this.isp = isp || `N/A`;
    }

//we're creating an array of divs for displaying data so made an array of data to display
//need to clear localStorage before runnign this
getDataToDisplay(): string[]{
 const ipData = this.ip;
 let addressData: string;
 if(this.postalCode === `unknown`){
    addressData = `${this.city},\n${this.region || this.country}`;
 } else{
    addressData = `${this.city}, ${this.region || this.country}\n${this.postalCode}`;
 }
 const timezoneData = `UTC${this.timezone}`;
 const ispData = this.isp;
 return [ipData, addressData, timezoneData, ispData];
}
}