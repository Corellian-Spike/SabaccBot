const saveDelete = require("../helpers/save.delete");

module.exports = {
    name: 'delete',
    description: 'deletes game',
    execute(bot, message, args) {
        saveDelete(message);
        message.channel.send(`GAME DELETED`);
    }
};