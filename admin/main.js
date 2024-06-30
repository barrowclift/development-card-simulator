"use strict";

// DEPENDENCIES
// ------------
// External
import path from "path";
// Local
import Logger from "../backend/common/Logger.js";
import paths from "../backend/common/paths.js";
import Server from "../backend/Server.js";
import PropertyManager from "../backend/common/PropertyManager.js";


// CONSTANTS
// ---------
const CLASS_NAME = "main";


// GLOBALS
// -------
let propertyManager = null;
let mongoClient = null;
let recordFetcher = null;
let boardGameFetcher = null;
let bookFetcher = null;
let server = null;

const log = new Logger(CLASS_NAME);
let propertiesFileName = path.join(paths.BACKEND_RESOURCES_DIRECTORY_PATH, "catan.properties");


// STARTUP
// -------
log.info("Starting up...");

async function startup() {
    propertyManager = new PropertyManager();
    await propertyManager.load(propertiesFileName);

    server = new Server(propertyManager);
    server.start();
}

try {
    startup();
} catch (error) {
    log.error("startup", error);
}


// SHUTDOWN
// --------
["SIGHUP",
 "SIGINT",
 "SIGQUIT",
 "SIGIL",
 "SIGTRAP",
 "SIGABRT",
 "SIGBUS",
 "SIGFPE",
 "SIGUSR1",
 "SIGSEGV",
 "SIGUSR2",
 "SIGTERM"
].forEach(function(signal) {
    // Catching & handling all terminating signals
    process.on(signal, function() {
        log.info("Received signal=" + signal);
        shutdown();

        // Force a shutdown anyway if still alive after ten seconds
        setTimeout(function() {
            log.warn("Shutdown still not complete, forcing shutdown... NOW");
            process.exit(1);
        }, 10000);
    });
})
async function shutdown() {
    log.info("Shutting down...");
    await server.stop();
    log.info("Completed shutdown");
    process.exit(0);
}