import axios from 'axios';

const apiURL = 'http://localhost:5000/api/';

class CreatorAPI {
  createDetectiveCaseInfo = detectiveCaseInfoRequest =>
    axios.put(
      apiURL + 'create/createDetectiveCaseInfo',
      detectiveCaseInfoRequest
    );
  updateDetectiveCaseInfo = detectiveCaseInfoRequest =>
    axios.post(
      apiURL + 'create/updateDetectiveCaseInfo',
      detectiveCaseInfoRequest
    );
  getNewDetectiveCase = caseId =>
    axios.get(apiURL + 'play/getNewDetectiveCaseById/' + caseId);

  createLocation = locationPayload =>
    axios.put(apiURL + 'create/createLocation', locationPayload);

  updateLocation = locationPayload =>
    axios.post(apiURL + 'create/updateLocation', locationPayload);

  deleteLocation = locationPayload =>
    axios.delete(apiURL + 'create/deleteLocation', { data: locationPayload });
}

export default CreatorAPI;
