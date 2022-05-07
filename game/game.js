const Deck = require("./deck");
const Player = require("./player");

module.exports = class Game {
    constructor(channelid, userArray, credits) {
        this.id = channelid
        this.players = userArray.map((user) => new Player(user, credits));
        this.deck = new Deck();
    };
};