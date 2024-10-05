import { type Card, Rank, Suit } from './card';

export class Deck {
  constructor(public cards: Card[] = []) {
    this.cards =
      cards.length > 0
        ? cards
        : Object.values(Suit).flatMap(suit => Object.values(Rank).map(rank => ({ suit, rank }) as Card));
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw = () => this.cards.pop();
}
