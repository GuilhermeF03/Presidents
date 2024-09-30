import { Rank, Suit, type Card } from "./Card";

class Deck {
    cards: Card[];
    constructor(cards: Card[] = []) {

        this.cards = (cards.length > 0) 
        ? cards 
        : Object.values(Suit).flatMap(suit => Object.values(Rank).map(rank => ({ suit, rank }) as Card));
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));            
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw = () => this.cards.pop()
}

export { Deck };