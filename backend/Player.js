"use strict";

// DEPENDENCIES
// ------------
// External

// Local
let Logger = require("./common/Logger");
let util = require("./common/util");


// CONSTANTS
// ---------
const CLASS_NAME = "Player";


// GLOBALS
// -------
let log = new Logger(CLASS_NAME);


class Player {

    constructor() {
        this.hand = [];
        this.played = [];
    }

    add(card) {
        this.hand.push(card);
    }

    play(card) {
        var index = this.hand.findIndex(cardInHand => cardInHand.title === card.title);
        if (index === -1) {
            return;
        }
        this.played.push(...this.hand.splice(index, 1));
    }

    generateId() {
        return util.uuidv4();
    }

}

module.exports = Player;