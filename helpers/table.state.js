const { Embed } = require('@discordjs/builders');
const read = require('./save.read');
const emoji = require('./emoji');

module.exports = (message, newgame) => { 
    const game = newgame || read(message.channelId);
    if (!game) {
        return () => message.channel.send('\`\`\`ERROR: GAME NOT FOUND.\nTO START A GAME, USE $game\`\`\`');
    }
    let playerStats = [];
    for (player of game.players) {
        const facedown = player.hand.map(() => 'back');
        playerStats.push({name: `${player.name} | ${player.credits}${emoji('credit')}`, value: `${emoji(facedown)}\n`});
    }
    const potEmbed = new Embed()
        .setColor(10038562)
        .setDescription(`**POT | SABACC**\n**0${emoji('credit')}** (+0${emoji('credit')})`);
    
    const deckEmbed = new Embed()
        .setColor(10038562)
        .setDescription(`**DECK | DISCARD**`);

    const deckRow = `${emoji('deck')}${emoji(game.deck.order[game.deck.order.length - 1])}`

    const bottomEmbed = new Embed()
        .setColor(10038562)
        .setDescription(`**PLAYERS**`)
        .addFields(...playerStats);
    
    function output() {
        message.channel.send({embeds: [deckEmbed]});
        message.channel.send(deckRow);
        message.channel.send({embeds: [potEmbed]});
        message.channel.send({embeds: [bottomEmbed]});
    }

    return output;
};