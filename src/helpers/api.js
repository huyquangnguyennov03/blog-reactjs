import axios from "axios"; 


export default function requestAPI(endpoint, method, body, responseType) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const instance = axios.create({headers});

    return instance({
        
        method: method,
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        data: body,
        responseType: responseType
    });
}