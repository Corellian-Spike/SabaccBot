const fs = require('fs');

module.exports = (channelId) => { 
    const data = JSON.parse(fs.readFileSync('./json/save.json'));
    return data[channelId];
};