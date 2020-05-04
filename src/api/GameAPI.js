import axios from 'axios';

const apiURL = 'http://localhost:5000/api/';

class GameAPI {
  getDetectiveCaseSave = saveDetectiveCaseRequest =>
    axios.post(apiURL + 'play/getDetectiveCaseSave', saveDetectiveCaseRequest);
  getAllCases = _ => axios.get(apiURL + 'dashboard/getAllCases');
  getNewDetectiveCase = caseId =>
    axios.get(apiURL + 'play/getNewDetectiveCaseById/' + caseId);
}

export default GameAPI;
