import type { Card } from './card.ts';

export class Hand {
  cards: Card[] = [];

  constructor(cards: Card[] = []) {
    this.cards = cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(card: Card) {
    const index = this.cards.findIndex(c => c.suit === card.suit && c.rank === card.rank);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }

  getCards(): Card[] {
    return this.cards;
  }

  getHighestCards(n: number): Card[] {
    if (n > this.cards.length) {
      return this.cards;
    }
    const sortedCards = [...this.cards].sort((a, b) => {
      if (a.rank === b.rank) {
        return a.rank;
      }
      return a.rank - b.rank;
    });
    return sortedCards.slice(-n);
  }

  getLowestCards(n: number): Card[] {
    if (n > this.cards.length) {
      return this.cards;
    }
    const sortedCards = [...this.cards].sort((a, b) => {
      if (a.rank === b.rank) {
        return a.rank;
      }
      return a.rank - b.rank;
    });
    return sortedCards.slice(0, n);
  }

  static swapCards(handA: Hand, handB: Hand, cardsA: Card[], cardsB: Card[]) {
    for (const card of cardsA) {
      handA.removeCard(card);
      handB.addCard(card);
    }
    for (const card of cardsB) {
      handB.removeCard(card);
      handA.addCard(card);
    }
  }
}
