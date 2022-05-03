const CommandHandler = (bot, Discord, fs) => {
    console.log(`Loading commands:`);
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        console.log(`  $${command.name}`);
        bot.commands.set(command.name, command);
    };
};

module.exports = CommandHandler;