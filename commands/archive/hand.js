const emoji = require('../../helpers/emoji');
const score = require('../../helpers/score');

module.exports = {
    name: 'hand',
    description: 'illustrates a hand',
    execute(bot, message, args) {
        let emojiHand = ``;
        for (arg of args) {
            emojiCard = emoji(arg);
            if (!emojiCard) {
                message.channel.send(`I cannot read this hand.`);
                message.channel.send(`Cards should be written as signed numerals between -10 and 10, separated by spaces.`);
                message.channel.send(`Try: $hand 6 -6 3 -3 0`);
                return;
            };
            emojiHand += emojiCard;
        };
        if (emojiHand.length < 1) {
            message.channel.send(`I cannot read this hand.`);
            message.channel.send(`Cards should be written as signed numerals between -10 and 10, separated by spaces.`);
            message.channel.send(`Try: $hand 6 -6 3 -3 0`);
            return;
        };
        const handValues = args.map(card => parseInt(card));
        const handScore = score(handValues);

        message.channel.send(`**${handScore.name}**`);
        message.channel.send(emojiHand);
        message.channel.send(`(id: ${handScore.rank})`);
    }
};