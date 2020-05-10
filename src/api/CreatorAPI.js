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

  createLocationConnection = locationConnectionPayload =>
    axios.put(
      apiURL + 'create/createLocationConnection',
      locationConnectionPayload
    );

  updateLocationConnection = locationConnectionPayload =>
    axios.post(
      apiURL + 'create/updateLocationConnection',
      locationConnectionPayload
    );

  deleteLocationConnection = locationConnectionPayload =>
    axios.delete(apiURL + 'create/deleteLocationConnection', {
      data: locationConnectionPayload,
    });

  createItem = itemPayload =>
    axios.put(apiURL + 'create/createItem', itemPayload);

  updateItem = itemPayload =>
    axios.post(apiURL + 'create/updateItem', itemPayload);

  deleteItem = itemPayload =>
    axios.delete(apiURL + 'create/deleteItem', { data: itemPayload });

  createPerson = personPayload =>
    axios.put(apiURL + 'create/createPerson', personPayload);

  updatePerson = personPayload =>
    axios.post(apiURL + 'create/updatePerson', personPayload);

  deletePerson = personPayload =>
    axios.delete(apiURL + 'create/deletePerson', { data: personPayload });
}

export default CreatorAPI;
