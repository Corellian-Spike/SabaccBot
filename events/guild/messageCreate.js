module.exports = (Discord, bot, message) => {
    const prefix = `$`;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName);
    if (command) command.execute(bot, message, args);
};