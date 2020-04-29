import axios from 'axios';

const apiURL = 'http://localhost:5000/api/play/';

class GameAPI {
  getDetectiveCaseSave = saveDetectiveCaseRequest =>
    axios.post(apiURL + 'getDetectiveCaseSave', saveDetectiveCaseRequest);
}

export default GameAPI;
