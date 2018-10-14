import { Component, OnInit, Input } from '@angular/core';

//Models
import { RoundResult } from '../../models/round-result.model';

//Services
import { Config } from '../../services/config.service';
import { PlayerCard } from '../../models/player-card.model';

@Component({
  selector: 'game-results',
  templateUrl: './game-results.component.html',
})
export class GameResultsComponent implements OnInit {
  // #region Properties

  // objects:
  gameResults: RoundResult[] //store all round results
  //Inputs
  @Input() roundsCount: number;
  @Input() playersCount: number;

  constructor(private _config: Config) {
  }

  ngOnInit(): void {
  }
  //run after user draw a card
  afterUserDrawACard(playerCard: PlayerCard, round: number): void {
    alert(playerCard.card.value);
    alert(round);
  }
}
