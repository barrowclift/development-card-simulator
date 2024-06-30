"use strict";

// DEPENDENCIES
// ------------
// External

// Local
import Logger from "./common/Logger.js";
import util from "./common/util.js";


// CONSTANTS
// ---------
const CLASS_NAME = "Player";


// GLOBALS
// -------
let log = new Logger(CLASS_NAME);


export default class Player {

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
