import axios, { Method } from 'axios';

export default async function makeRequest(url, method, inputPayload){
    let requestConfig = {
        baseURL: `${process.env.REACT_APP_SERVER_IP}`,
        url: url,
        method: method,
        headers: {
            Authorization: localStorage.getItem("authKey") || ""
        },
        data: {}
    };

    // console.log(requestConfig)
    if (method !== 'get' && inputPayload) {
        requestConfig.data = inputPayload;
    }

    try {
        let response = await axios.request(requestConfig);
        return response;
    } catch (error) {
        throw error;
    }


}