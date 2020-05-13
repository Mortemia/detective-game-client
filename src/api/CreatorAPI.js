import API from './API';

class CreatorAPI extends API {
  createDetectiveCaseInfo = detectiveCaseInfoRequest =>
    this.put('create/createDetectiveCaseInfo', detectiveCaseInfoRequest);

  updateDetectiveCaseInfo = detectiveCaseInfoRequest =>
    this.post('create/updateDetectiveCaseInfo', detectiveCaseInfoRequest);

  getNewDetectiveCase = caseId =>
    this.get('play/getNewDetectiveCaseById/' + caseId);

  createLocation = locationPayload =>
    this.put('create/createLocation', locationPayload);

  updateLocation = locationPayload =>
    this.post('create/updateLocation', locationPayload);

  deleteLocation = locationPayload =>
    this.delete('create/deleteLocation', { data: locationPayload });

  createLocationConnection = locationConnectionPayload =>
    this.put('create/createLocationConnection', locationConnectionPayload);

  updateLocationConnection = locationConnectionPayload =>
    this.post('create/updateLocationConnection', locationConnectionPayload);

  deleteLocationConnection = locationConnectionPayload =>
    this.delete('create/deleteLocationConnection', {
      data: locationConnectionPayload,
    });

  createItem = itemPayload => this.put('create/createItem', itemPayload);

  updateItem = itemPayload => this.post('create/updateItem', itemPayload);

  deleteItem = itemPayload => this.delete('create/deleteItem', itemPayload);

  createPerson = personPayload =>
    this.put('create/createPerson', personPayload);

  updatePerson = personPayload =>
    this.post('create/updatePerson', personPayload);

  deletePerson = personPayload =>
    this.delete('create/deletePerson', personPayload);

  createQuestion = questionPayload =>
    this.put('create/createQuestion', questionPayload);

  updateQuestion = questionPayload =>
    this.post('create/updateQuestion', questionPayload);

  deleteQuestion = questionPayload =>
    this.delete('create/deleteQuestion', questionPayload);

  createAction = actionPayload =>
    this.put('create/createAction', actionPayload);

  updateAction = actionPayload =>
    this.post('create/updateAction', actionPayload);

  deleteAction = actionPayload =>
    this.delete('create/deleteAction', actionPayload);
}

export default CreatorAPI;
