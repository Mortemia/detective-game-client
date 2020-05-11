import API from './API';

class GameAPI extends API {
  getDetectiveCaseSave = saveDetectiveCaseRequest =>
    this.post('play/getDetectiveCaseSave', saveDetectiveCaseRequest);

  getAllCases = () => this.get('dashboard/getAllCases');

  getNewDetectiveCase = caseId =>
    this.get('play/getNewDetectiveCaseById/' + caseId);

  saveDetectiveCase = game =>
    this.post('play/saveDetectiveCase', {
      caseId: game.case_id,
      playerId: game.player_id,
      score: game.score,
      saveJson: game,
    });
}

export default GameAPI;
