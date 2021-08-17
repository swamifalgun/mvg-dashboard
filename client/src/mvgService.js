import axios from "axios";

const tramUrl = "api/departures/trams";
const ubahnUrl = "api/departures/ubahns";

/* eslint-disable no-async-promise-executor */
class MvgService {
  static async getTramStatus() {
    let response;
    try {
      response = await axios.get(tramUrl);
    } catch (e) {
      console.log(`Error fetching tram status : ${e}`);
      // reject(e);
    }
    return response.data;
  }

  static async getUbahnStatus() {
    let response;
    try {
      response = await axios.get(ubahnUrl);
    } catch (e) {
      console.log(`Error fetching ubahn status : ${e}`);
      // reject(e);
    }
    return response.data;
  }
}

export default MvgService;
