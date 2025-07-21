//tried exporting the response object directly but it didn't work because the structures are very different, so had to create an interface to extract data and pass it to my class instances later
export interface IpifyAPIResponse{
    ip: string;
    location:{
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
    };
    isp:string;
}