"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpMatchingLocation = void 0;
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
    IpMatchingLocation.prototype.getDataToDisplay = function () {
        var ipData = this.ip;
        var addressData;
        if (this.postalCode === "unknown") {
            addressData = "".concat(this.city, ", \n").concat(this.region);
        }
        else {
            addressData = "".concat(this.city, ", ").concat(this.region, "\n").concat(this.postalCode);
        }
        var timezoneData = "UTC".concat(this.timezone);
        var ispData = this.isp;
        return [ipData, addressData, timezoneData, ispData];
    };
    return IpMatchingLocation;
}());
exports.IpMatchingLocation = IpMatchingLocation;
