import makeRequest from "../api/makeRequest";
import { RequstMethods } from "../api/requestMethod";
import urls from "../api/urls";


export class DataService {
    static async getData() {
        return await makeRequest(urls.getData, RequstMethods.GET);
    }  
}