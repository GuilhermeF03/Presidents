import e from "express";
import { Rank, Suit, type Card } from "./Card";

class Deck {
    cards: Card[];
    constructor() {
        this.cards = Object.values(Suit).flatMap(suit =>
            Object.values(Rank).map(rank => ({ suit, rank }) as Card)
        );
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));            
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}

export { Deck };