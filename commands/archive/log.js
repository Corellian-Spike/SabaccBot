module.exports = {
    name: 'log',
    description: 'console.log()s the message object',
    execute(bot, message, args) {
        console.log(message);
        console.log(message.mentions.users);
    }
};