import { Deck } from "./deck.model";

export class Game {
  constructor(
    public deck: Deck,
    public playersCount: number,
    public roundsCount: number
  ) { }
}
