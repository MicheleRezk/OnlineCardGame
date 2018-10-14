import { Card } from "./card.model";
//each player draw card
export class PlayerCard {
  constructor(
    public playerID: number,
    public card: Card //if true this means one of players draw it
  ) { }
}
