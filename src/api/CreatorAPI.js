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
}

export default CreatorAPI;
