import { Component, OnInit } from '@angular/core';

//Models
import { Game } from '../../models/game.model';

//Services
import { GameService } from '../../services/game.service';
import { Config } from '../../services/config.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'card-game',
  templateUrl: './card-game.component.html',
})
export class CardGameComponent implements OnInit {
  // #region Properties

  // objects:
  game: Game;
  cards: Card[]

  //game settings
  playersCount: number = 2;
  roundsCount: number = null;
  currentPlayer: number = 1;
  currentRound: number = 1;


  errorMessage: string;
  isLoading: boolean;

  constructor(private _gameService: GameService, private _config: Config) {

  }

  ngOnInit(): void {
    //Initalize new card game
    this.initalizeCardGame();
  }
  initalizeCardGame(): void{
    this.isLoading = true;
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
  }
}
