import axios from 'axios';

const apiURL = 'http://localhost:5000/api/';

class CreatorAPI {
  createDetectiveCaseInfo = detectiveCaseInfoRequest =>
    axios.put(
      apiURL + 'create/createDetectiveCaseInfo',
      detectiveCaseInfoRequest
    );
}

export default CreatorAPI;
