const fs = require('fs');
module.exports = (game) => { 
    const data = JSON.parse(fs.readFileSync('./json/save.json'));
    data[game.id] = game;
    fs.writeFileSync('./json/save.json', JSON.stringify(data));
    return;
};