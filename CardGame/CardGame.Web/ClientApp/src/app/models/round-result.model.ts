import { PlayerCard } from "./player-card.model";

//Store Round Result
export class RoundResult {
  constructor(
    public roundID: number,//round ID
    public winnerID: number,//player ID who win this round
    public playerCards: PlayerCard[] = [] // drawn cards in this round
  ) { }
}
