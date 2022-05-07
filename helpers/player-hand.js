const { Embed } = require("@discordjs/builders");
const emoji = require("./emoji");
const score = require("./score");

module.exports = (player, message) => {
    const topEmbed = new Embed()
        .setColor(10038562)
        .setTitle(`YOUR HAND - *${score(player.hand.map(card => card.value)).name}*`);

    const handRow = emoji(player.hand);

    const bottomEmbed = new Embed()
        .setColor(10038562)
        .setDescription(`:arrow_left: BACK TO GAME CHANNEL https://discord.com/channels/${message.guildId}/${message.channelId}`)
    
    function output() {
        player.user.send({embeds: [topEmbed]});
        player.user.send(handRow);
        player.user.send({embeds: [bottomEmbed]});
    }

    return output;
}