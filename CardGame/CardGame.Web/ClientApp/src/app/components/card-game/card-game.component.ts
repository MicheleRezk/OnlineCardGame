import { Component, OnInit, ViewChild } from '@angular/core';

//Models
import { Game } from '../../models/game.model';
import { Card } from '../../models/card.model';
import { RoundResult } from '../../models/round-result.model';
import { PlayerCard } from '../../models/player-card.model';

//Services
import { GameService } from '../../services/game.service';
import { Config } from '../../services/config.service';

//Components
import { GameResultsComponent } from '../game-results/game-results.component';

@Component({
  selector: 'card-game',
  templateUrl: './card-game.component.html',
})
export class CardGameComponent implements OnInit {
  // #region Properties

  // objects:
  game: Game;
  cards: Card[]
  gameResults: RoundResult[] //store all round results

  //game settings
  minPlayersCount: number = 2;
  maxPlayersCount: number = 10;
  minRoundsCount: number = 2;
  maxRoundsCount: number = 26;

  playersCount: number = 2;
  roundsCount: number = null;
  currentPlayer: number = 1;
  currentRound: number = 1;
  isGameFinished: boolean = false;
  winner: number = 1;
  errorMessage: string;
  isLoading: boolean;

  // #region Children
  @ViewChild(GameResultsComponent)
  Child_GameResults: GameResultsComponent;

  constructor(private _gameService: GameService, private _config: Config) {
  }

  ngOnInit(): void {
    //Initalize new card game
    this.initalizeCardGame();
  }
  initalizeCardGame(): void {
    this.isLoading = true;
    console.log(this.playersCount);
    this._gameService.getNewCardGame(this.playersCount, this.roundsCount).subscribe(
      response => this.loadTheGame(response),
      error => this.errorMessage = <any>error,
      () => this.isLoading = false
    );
  }
  loadTheGame(response: Game): void {
    this.game = response;
    this.cards = response.deck.cards;
    this.roundsCount = response.roundsCount;
    this.currentPlayer = 1;
    this.currentRound = 1;
    this.winner = null;
    this.isGameFinished = false;
    //reset game results
    this.Child_GameResults.resetGameResults(this.playersCount, this.roundsCount);
  }
  //when player choose card
  drawCard(card: Card): void {
    if (card.isOpened || this.isGameFinished)
      return;
    card.isOpened = true; //mark it as opened
    //Add to Game Results Component
    let playerCard: PlayerCard = { playerID: this.currentPlayer, card: card };
    this.addgameResult(playerCard);
    this.changePlayerAndRound();
  }
  //change current player and current round
  changePlayerAndRound(): void {
    if (this.currentPlayer + 1 > this.playersCount)//then start again from first player and start new round
    {
      this.currentPlayer = 1;
      //start new round our exist the game
      if (this.currentRound + 1 > this.roundsCount)//this means it's the last round and we should exit the game
      {
        this.isGameFinished = true;
        //get game winners
        //this.winner = this.Child_GameResults.getGameWinner();
      }
      else {
        this.currentRound++;
      }
    }
    else {
      this.currentPlayer++;
    }
  }
  //add round result after user draw a card
  addgameResult(playerCard: PlayerCard): void {
    this.Child_GameResults.afterUserDrawACard(playerCard, this.currentRound);
  }
}
