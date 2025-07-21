var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//getting user's IP for initial map upload on page load
export function fetchUserIp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.ipify.org/?format=json`);
            if (!response.ok) {
                throw new Error(`Could not fetch user's IP`);
            }
            else {
                const userData = yield response.json();
                return userData.ip;
            }
        }
        catch (error) {
            throw new Error(`Couldn't fetch user's IP due to error: ${error}`);
        }
    });
}
//getting location object from API, passing it an IP string we'll take from the input field
//added interface as a promise type for return
export function fetchLocationByIp(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_OPiP6CE1TVqGdNZVSVxvxS0bdCGer&ipAddress=${ip}`);
            if (!response.ok) {
                throw new Error(`No network response`);
            }
            else {
                const locationObject = yield response.json();
                return locationObject;
            }
        }
        catch (error) {
            throw new Error(`Couldn't fetch location due to error: ${error}`);
        }
    });
}
