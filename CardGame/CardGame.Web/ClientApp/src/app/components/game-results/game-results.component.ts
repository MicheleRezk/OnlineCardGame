import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash-es';

//Models
import { RoundResult } from '../../models/round-result.model';
import { PlayerCard } from '../../models/player-card.model';
import { PlayerWinnings } from '../../models/player-winnings.model';

//Services
import { Config } from '../../services/config.service';

@Component({
  selector: 'game-results',
  templateUrl: './game-results.component.html',
})
export class GameResultsComponent implements OnInit {
  // #region Properties

  // objects:
  gameResults: RoundResult[] = [] //store all round results
  allPlayers: number[] = []
  //Inputs
  @Input() roundsCount: number;
  @Input() playersCount: number;

  constructor(private _config: Config) {
  }

  ngOnInit(): void {
    this.fillPlayersIDs();
  }
  //run after user draw a card
  afterUserDrawACard(playerCard: PlayerCard, round: number): void {
    let roundResult: RoundResult = _.find(this.gameResults, function (result: RoundResult) { return result.roundID == round; });
    if (roundResult != null) {
      //then add this player result and if this the last player then set the winner
      roundResult.playerCards.push(playerCard);
      if (playerCard.playerID == this.playersCount)//this is the last player
      {
        //get the winner with the highest card
        let roundWinner: PlayerCard = _.maxBy(roundResult.playerCards, function (playerCard: PlayerCard) { return playerCard.card.value; });
        roundResult.winnerID = roundWinner.playerID;
      }
    }
    else {
      let result: RoundResult = { roundID: round, playerCards: [playerCard], winnerID: null };
      this.gameResults.push(result);
    }
  }

  //reset game results
  resetGameResults(playersCount: number, roundsCount: number): void {
    this.playersCount = playersCount;
    this.roundsCount = roundsCount;
    this.fillPlayersIDs();
    _.remove(this.gameResults);
  }
  fillPlayersIDs(): void {
    _.remove(this.allPlayers);
    //Fill Player IDs
    for (var i = 1; i <= this.playersCount; i++) {
      this.allPlayers.push(i);
    }
  }

  getGameWinners(): PlayerWinnings[] {
    let topWinners: PlayerWinnings[] = [];
    if (this.gameResults && this.gameResults.length > 0) {
      var countByWinner = _.countBy(this.gameResults, function (roundResult: RoundResult) { return roundResult.winnerID });
      //count of winning rounds per each player, fill this array
      let countOfWinningsPerPlayer: PlayerWinnings[] = [];
      _.mapKeys(countByWinner, function (value, key) {
        let playerWinnings: PlayerWinnings = new PlayerWinnings(key, value);
        countOfWinningsPerPlayer.push(playerWinnings);
        return playerWinnings;
      });

      let maxWinning: PlayerWinnings = _.maxBy(countOfWinningsPerPlayer, function (winningsCountPerPlayer: PlayerWinnings) { return winningsCountPerPlayer.countOfWinnings });
      topWinners = _.filter(countOfWinningsPerPlayer, function (winningsCountPerPlayer: PlayerWinnings) { return winningsCountPerPlayer.countOfWinnings == maxWinning.countOfWinnings; });
    }
    return topWinners;
  }
}
