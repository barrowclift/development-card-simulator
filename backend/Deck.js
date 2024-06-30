"use strict";

// DEPENDENCIES
// ------------
// External

// Local
import Logger from "./common/Logger.js";


// CONSTANTS
// ---------
const CLASS_NAME = "Deck";


// GLOBALS
// -------
let log = new Logger(CLASS_NAME);

const CARDS = {
    GREAT_HALL: {
        title: "Great Hall",
        description: "1 Victory Point! Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        totalCount: 1,
        image: "great-hall",
        isVp: true
    },
    CHAPEL: {
        title: "Chapel",
        description: "1 Victory Point! Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        totalCount: 1,
        image: "chapel",
        isVp: true
    },
    UNIVERSITY : {
        title: "University",
        description: "1 Victory Point! Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        totalCount: 1,
        image: "university",
        isVp: true
    },
    MARKET: {
        title: "Market",
        description: "1 Victory Point! Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        totalCount: 1,
        image: "market",
        isVp: true
    },
    LIBRARY: {
        title: "Library",
        description: "1 Victory Point! Reveal this card on your turn if, with it, you reach the number of points required for victory.",
        totalCount: 1,
        image: "library",
        isVp: true
    },
    YEAR_OF_PLENTY: {
        title: "Year of Plenty",
        description: "Take any 2 resources from the band. Add them to your hand. They can be 2 of the same resource or 2 different resources.",
        totalCount: 2,
        image: "year-of-plenty",
    },
    MONOPOLY: {
        title: "Monopoly",
        description: "When you play this card, announce 1 type of resource. All other players must give you all of their resources of that type.",
        totalCount: 2,
        image: "monopoly",
    },
    ROAD_BUILDING: {
        title: "Road Building",
        description: "Place 2 new roads as if you had just built them.",
        totalCount: 2,
        image: "road-building",
    },
    KNIGHT: {
        title: "Knight",
        description: "Move the robber. Steal 1 resource from the owner of a settlement or city adjacent to the robber's new hex.",
        totalCount: 14,
        image: "knight",
    }
}

export default class Deck {

    constructor() {
        this.reset();
    }

    get() {
        return this.deck;
    }

    draw() {
        if (this.deck.length === 0) {
            return;
        }
        return this.deck.pop();
    }

    discard(card) {
        this.discardPile.push(card);
    }

    reset() {
        this.deck = [];
        this.discardPile = [];
        let key = 0;
        Object.values(CARDS).forEach((card) => {
            for (let i = 0; i < card.totalCount; i++) {
                this.deck.push({
                    ...card,
                    key: key++
                });
            }
        });
        this.shuffleDeck();
    }

    shuffleDiscardPileIntoDeck() {
        this.deck = this.deck.concat(this.discardPile);
        this.discardPile = [];
        this.shuffleDeck();
    }

    /**
     * Thanks to Jeff for the solution
     * https://stackoverflow.com/users/353278
     * https://stackoverflow.com/a/6274381
     */
    shuffleDeck() {
        var currentIndex = this.deck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }
    }

}
