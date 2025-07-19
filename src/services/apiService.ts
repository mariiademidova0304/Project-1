//getting user's IP for initial map upload on page load
export async function fetchUserIp(): Promise<string>{
 try {
    const response = await fetch(`https://api.ipify.org/?format=json`);
    if(!response.ok){
        throw new Error(`Could not fetch user's IP`);
    } else {
        const userData = await response.json();
        return userData.ip;
 }
} catch(error){
        throw new Error(`Couldn't fetch user's IP due to error: ${error}`);
}
}

//getting location object from API, passing it an IP string we'll take from the input field
export async function fetchLocationByIp(ip:string): Promise<{}>{
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_OPiP6CE1TVqGdNZVSVxvxS0bdCGer&ipAddress=${ip}`);
    if(!response.ok){
        throw new Error(`No network response`);
    } else {
        const locationObject = await response.json();
        return locationObject;
    }
    } catch(error) {
        throw new Error(`Couldn't fetch location due to error: ${error}`);
    }
}