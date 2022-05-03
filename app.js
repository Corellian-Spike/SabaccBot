const Discord = require('discord.js');
const fs = require('fs');

require('dotenv').config();
const token = process.env.TOKEN;

const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['command-handler', 'event-handler'].forEach(handler => {
    require(`./handlers/${handler}`)(bot, Discord, fs);
});

// last line
bot.login(token);
