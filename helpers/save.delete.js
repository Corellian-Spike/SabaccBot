const fs = require('fs');
module.exports = (message) => { 
    const data = JSON.parse(fs.readFileSync('./json/save.json'));
    delete data[message.channelId];
    fs.writeFileSync('./json/save.json', JSON.stringify(data));
    return;
};