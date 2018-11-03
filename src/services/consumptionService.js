import axios from "axios";

class consumptionservice {

    constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.host = 'http://localhost:4000/api/v1/consumption';
        }
        else {
            this.host = 'https://consapi.azurewebsites.net/api/v1/consumption';
        }
    }

    latest(meterId) {
        return axios.get(this.host + `/${meterId}/latest`);
    }
}

export default new consumptionservice();
