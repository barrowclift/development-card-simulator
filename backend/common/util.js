"use strict";

// DEPENDENCIES
// ------------
// External
import path from "path";
// Local
import Logger from "../common/Logger.js";


// GLOBALS
// -------
let log = new Logger("util");


let sleepForSeconds = (seconds) => {
    log.debug("Sleeping for " + seconds + " seconds...");
    return new Promise((resolve, reject) => {
        _sleepForSeconds(
            seconds
        ).then(() => {
            log.debug("Done sleeping!");
            resolve();
        });
    });
};
function _sleepForSeconds(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

let minutesToMillis = function(minutes) {
    return minutes * 60000;
};
let secondsToMillis = function(minutes) {
    return minutes * 1000;
};

/**
 * Thanks to broofa for the solution
 * https://stackoverflow.com/users/109538
 * https://stackoverflow.com/a/2117523
 */
let uuidv4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default {
    sleepForSeconds,
    minutesToMillis,
    secondsToMillis,
    uuidv4
}
