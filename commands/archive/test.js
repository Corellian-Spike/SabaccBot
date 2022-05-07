module.exports = {
    name: 'test',
    description: 'hello world',
    execute(bot, message, args) {
        message.channel.send(`This is a pretend sabacc hand:`);
        message.channel.send(`<:g1:970796470779412562><:g1:970796470779412562><:r2:970796272518836284>`);
    }
};