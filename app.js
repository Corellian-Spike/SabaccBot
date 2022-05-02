const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const token = process.env.TOKEN;

bot.on('ready', ()=>{
    console.log('ready');
});

const prefix = '$';

bot.on('messageCreate', message => {
    let arguments = message.content.substring(prefix.length).split(' ');

    'test' === arguments[0] ? 
        message.reply('acknowledged') : null;
    
    
});



// last line
bot.login(token);
