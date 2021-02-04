"use strict";

// DEPENDENCIES
// ------------
// External
let express = require("express");
let path = require("path");
let socketIo = require("socket.io");
let { Liquid } = require("liquidjs");
let compression = require("compression");
// Local
let Logger = require("./common/Logger");
let paths = require("./common/paths");
let socketCodes = require("./common/socketCodes");
let util = require("./common/util");
let Deck = require("./Deck");
let Player = require("./Player");


// CONSTANTS
// ---------
const CLASS_NAME = "Server";


// GLOBALS
// -------
let log = new Logger(CLASS_NAME);


class Server {

    constructor(propertyManager) {
        this.propertyManager = propertyManager;
        this.deck = new Deck();
        this.players = {};

        /**
         * We don't just want to pass in our entire propertyManager object to the
         * frontend, we just want to map the propertyManager we know are required
         * by the Liquid engine to render the page.
         */
        let liquidVariables = {
            "siteTitle": this.propertyManager.title,
            "siteUrl": this.propertyManager.publicUrl,
            "twitterHandle": this.propertyManager.twitterHandle,
            "publicState": socketCodes.PUBLIC_STATE,
            "hand": socketCodes.HAND,
            "draw": socketCodes.DRAW,
            "play": socketCodes.PLAY,
            "endGame": socketCodes.END_GAME,
            "login": socketCodes.LOGIN,
        };

        this.frontendApp = express();
        this.frontendApp.use(express.static(paths.FRONTEND_STATIC_DIRECTORY_PATH));
        const ENGINE = new Liquid({
            root: paths.FRONTEND_LIQUID_DIRECTORY_PATH,
            extname: ".liquid",
            cache: false // Setting to "true" screws with the images, keep `false`
        });
        this.frontendApp.engine("liquid", ENGINE.express()); // Register liquid engine
        this.frontendApp.use(compression());
        this.frontendApp.set("view engine", "liquid"); // Set that engine as the default
        this.frontendApp.set("views", [paths.FRONTEND_INCLUDES_DIRECTORY_PATH,
                                       paths.FRONTEND_LAYOUTS_DIRECTORY_PATH]);
        this.frontendApp.get("/", (request, response) => {
            response.render("catan", liquidVariables);
        });

        log.info("Initialized");
    }

    /**
     * ==============
     * PUBLIC METHODS
     * ==============
     */

    async start() {
        // Frontend socket.io server for sending and receiving messages with the client (the website itself)
        this.frontendServer = await this.frontendApp.listen(this.propertyManager.frontendPort);
        log.info("Now serving frontend requests");

        const frontendOptions = {
            cors: {
                origin: this.propertyManager.frontendUrl,
                methods: [],
                credentials: true
            }
        }
        this.frontendIo = socketIo(this.frontendServer, frontendOptions);
        this.frontendIo.sockets.on("connection", (socket) => {
            log.debug("New client connected established with socket.io");

            socket.emit(socketCodes.PUBLIC_STATE, this.getPublicState());
            
            let player = new Player();
            let temporarilyDisable = false;
            socket.on(socketCodes.LOGIN, async (login) => {
                if (temporarilyDisable) {
                    return;
                }
                log.debug("Received frontend socket request to log in, name=" + login.name);
                if (login.password === this.propertyManager.frontendPassword) {
                    player.name = login.name;
                    let id = player.generateId();
                    for (let activeId in this.players) {
                        const activePlayer = this.players[activeId];
                        if (activePlayer.name === player.name) {
                            player = activePlayer;
                            id = activeId;
                            break;
                        }
                    }
                    this.players[id] = player;
                    socket.emit("authorized", { name: player.name, id });
                    this.frontendIo.emit(socketCodes.PUBLIC_STATE, this.getPublicState());
                    socket.emit(socketCodes.HAND, this.players[id].hand);
                } else {
                    temporarilyDisable = true;
                    await util.sleepForSeconds(3);
                    temporarilyDisable = false;
                    socket.emit(socketCodes.LOGIN, "Unrecognized name or password");
                }
            });
            socket.on(socketCodes.PUBLIC_STATE, ({ id }) => {
                if (!(id in this.players)) {
                    return;
                }
                log.debug("Received frontend socket request to return the public state");
                socket.emit(socketCodes.PUBLIC_STATE, this.getPublicState());
            });
            socket.on(socketCodes.HAND, ({ id }) => {
                if (!(id in this.players)) {
                    return;
                }
                log.debug("Received frontend socket request to send the player's current hand");
                socket.emit(socketCodes.HAND, this.players[id].hand);
            });
            socket.on(socketCodes.DRAW, ({ id }) => {
                if (!(id in this.players)) {
                    return;
                }
                log.debug("Received frontend socket request to draw the next development card");
                let drawnCard = this.deck.draw();
                this.players[id].add(drawnCard);
                this.frontendIo.emit(socketCodes.PUBLIC_STATE, this.getPublicState());
                socket.emit(socketCodes.HAND, this.players[id].hand);
            });
            socket.on(socketCodes.PLAY, ({ id, card }) => {
                if (!(id in this.players)) {
                    return;
                }
                log.debug("Received frontend socket request to play a development card");
                this.players[id].play(card);
                this.frontendIo.emit(socketCodes.PUBLIC_STATE, this.getPublicState());
                socket.emit(socketCodes.HAND, this.players[id].hand);
            });
            socket.on(socketCodes.END_GAME, ({ id }) => {
                if (!(id in this.players)) {
                    return;
                }
                log.debug("Received frontend socket request to end the current game");
                this.deck.reset();
                this.players = {};
                player = new Player();
                this.frontendIo.emit(socketCodes.END_GAME);
            });
        });
    }

    getPublicState() {
        let activePlayers = [];
        Object.values(this.players).forEach((player) => activePlayers.push({
            name: player.name,
            numOfCards: player.hand.length,
            played: player.played
        }));
        return {
            activePlayers,
            numInDeck: this.deck.get().length,
            numInDiscard: this.deck.discardPile.length
        }
    }

    stop() {
        log.info("Stopping...");
        this.isStopping = true;
        this.frontendIo.close();
        this.frontendServer.close();
        log.info("Stopped");
    }

    getFrontendExpressApp() {
        return this.frontendApp;
    }

}

module.exports = Server;