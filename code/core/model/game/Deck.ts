import { type Card, Rank, Suit } from './card';

export class Deck {
  constructor(public cards: Card[] = []) {
    this.cards = cards.length > 0 ? cards : this.fillDeck();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  private fillDeck() {
    return Object.values(Suit).flatMap(suit => Object.values(Rank).map(rank => ({ suit, rank }) as Card));
  }

  draw = (): Card | undefined => this.cards.pop();
}
