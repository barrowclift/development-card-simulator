"use strict";

// DEPENDENCIES
// ------------
// External
let nodePropertyLoader = require("properties");
// Local
let Logger = require("./Logger");
let util = require("./util");


// CONSTANTS
// ---------
const CLASS_NAME = "PropertyManager";

// Assorted, base properties
const DEFAULT_FRONTEND_PORT = 10800;
const DEFAULT_BACKEND_PORT = 10801;
const DEFAULT_SITE_TITLE = "Catan"
const DEFAULT_URL = "http://localhost";
const DEFAULT_TWITTER_HANDLE = "";
const DEFAULT_USER_AGENT_BASE = "DevelopmentCardSimulator/1.0 +https://github.com/barrowclift/development-card-simulator";
const DEFAULT_FRONTEND_PASSWORD = "hunter2";

// GLOBALS
// -------
let log = new Logger(CLASS_NAME);


/**
 * Working with properties is a pain. You have to check for existance, have
 * default values defined, etc. This detracts from what the code using those
 * values actually wants: a sane default if not present, no boilerplate hiding
 * the core of their own logic.
 *
 * Thus, any and ALL Shelf properties are pre-loaded and validated here, and
 * if not provided or present fall back to sane defaults. Thus, letting
 * calling code get back to what's *actually* important to them: their own
 * work.
 */
class PropertyManager {

    /**
     * Does not automatically load any properties file, but simply initializes
     * all Shelf properties to their default values. To load
     * `shelf.properties`, call load().
     */
    constructor() {
        // Assorted, base properties
        this.title = DEFAULT_SITE_TITLE;
        this.twitterHandle = DEFAULT_TWITTER_HANDLE;
        this.frontendUrl = DEFAULT_URL;
        this.frontendPort = DEFAULT_FRONTEND_PORT;
        this.backendUrl = DEFAULT_URL;
        this.backendPort = DEFAULT_BACKEND_PORT;
        this.publicUrl = DEFAULT_URL;
        this.frontendPassword = DEFAULT_FRONTEND_PASSWORD;
    }

    /**
     * ==============
     * PUBLIC METHODS
     * ==============
     */

    async load(filename) {
        if (!filename) {
            throw "Property filename is null";
        }

        let properties = await this._load(filename);

        // Assorted, base properties

        if ("site.title" in properties) {
            this.title = properties["site.title"];
        }
        if ("public.url" in properties) {
            this.publicUrl = properties["public.url"];
        }
        if ("frontend.url" in properties) {
            this.frontendUrl = properties["frontend.url"];
        }
        if ("frontend.port" in properties) {
            this.frontendPort = properties["frontend.port"];
        }
        if ("backend.url" in properties) {
            this.backendUrl = properties["backend.url"];
        }
        if ("backend.port" in properties) {
            this.backendPort = properties["backend.port"];
        }
        if ("twitter.handle" in properties) {
            this.twitterHandle = properties["twitter.handle"];
        }
        if ("frontend.password" in properties) {
            this.frontendPassword = properties["frontend.password"];
        }

        this.backendUrl = this.backendUrl + ":" + this.backendPort;
        this.frontendUrl = this.frontendUrl + ":" + this.frontendPort;
    }

    /**
     * ===============
     * PRIVATE METHODS
     * ===============
     */

    async _load(filename) {
        // The properties package does not currently support promises natively
        return new Promise((resolve, reject) => {
            nodePropertyLoader.parse(filename,
                                     { path: true },
                                     (error, properties) => {
                if (error) {
                    log.error("loadProperties", "An error occurred while loading properties");
                    reject(Error(error));
                } else {
                    log.info("Loaded properties");
                    resolve(properties);
                }
            });
        });
    }

}

module.exports = PropertyManager;