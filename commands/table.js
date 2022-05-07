const tableState = require("../helpers/table.state");

module.exports = {
    name: 'table',
    description: 'launches game?',
    execute(bot, message, args) {
        tableState(message)();
    }
};