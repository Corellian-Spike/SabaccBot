const write = require('../helpers/save.write');
const read = require('../helpers/save.read');
const Game = require('../game/game');
const emoji = require('../helpers/emoji');
const score = require('../helpers/score');
const tableState = require('../helpers/table.state');
const playerHand = require('../helpers/player-hand');

module.exports = {
    name: 'game',
    description: 'launches game?',
    execute(bot, message, args) {
        if (read(message.channelId)) {
            message.channel.send(`\`\`\`ERROR: THERE IS ALREADY AN ACTIVE GAME IN THIS CHANNEL\n\tDELETE THE CURRENT GAME BEFORE STARTIN A NEW ONE: $delete\`\`\``);
            return;
        }
        const players = Array.from(message.mentions.users, ([key, value]) => value);
        if (!players.length) {
            message.channel.send(`NEW GAME`)
            message.channel.send(`\`\`\`SYNTAX ERROR: NO PLAYERS TAGGED\n\tWHEN CREATING A GAME YOU MUST TAG ALL PLAYERS (INCLUDING YOURSELF):\n\t$game @MyUsername @TheirUsername\`\`\``);
            return;
        }
        const game = new Game(message.channelId, players, 1000);
        message.channel.send(`NEW GAME`);
        game.deck.shuffle();
        message.channel.send(`SHUFFLING DECK: COMPLETE`);
        for (player of game.players) {
            game.deck.dealTo(player);
            playerHand(player, message)();
        }
        message.channel.send(`DEALING: COMPLETE`);
        tableState(message, game)();
        write(game);
    }
};