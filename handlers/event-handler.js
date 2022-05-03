const EventHandler = (bot, Discord, fs) => {
    const loadDir = (dir) => {
        console.log(`Loading ${dir} events:`);
        const eventFiles = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));
        if (eventFiles.length < 1) {
            console.log(` // no ${dir} events found`);
            return;
        }
        for (const file of eventFiles) {
            const event = require(`../events/${dir}/${file}`);
            const eventName = file.split('.')[0];
            bot.on(eventName, event.bind(null, Discord, bot));
            bot.events.set(event.name, event);
            console.log(` > ${eventName}`);
        };
    };
    ['bot', 'guild'].forEach(agent => loadDir(agent));
};

module.exports = EventHandler;