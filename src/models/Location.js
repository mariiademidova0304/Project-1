//class for the location data we're going to get from API and pass to use a Leadlet map or display on the page
var IpMatchingLocation = /** @class */ (function () {
    function IpMatchingLocation(ip, country, region, city, lat, lng, postalCode, timezone, isp) {
        this.ip = ip;
        this.country = country;
        this.region = region;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
        this.postalCode = postalCode || "unknown";
        this.timezone = timezone;
        this.isp = isp || "N/A";
    }
    //we're creating an array of divs for displaying data so made an array of data to display
    //need to clear localStorage before runnign this
    IpMatchingLocation.prototype.getDataToDisplay = function () {
        var ipData = this.ip;
        var addressData;
        if (this.postalCode === "unknown") {
            addressData = "".concat(this.city, ",\n").concat(this.region || this.country);
        }
        else {
            addressData = "".concat(this.city, ", ").concat(this.region || this.country, "\n").concat(this.postalCode);
        }
        var timezoneData = "UTC".concat(this.timezone);
        var ispData = this.isp;
        return [ipData, addressData, timezoneData, ispData];
    };
    return IpMatchingLocation;
}());
export { IpMatchingLocation };
