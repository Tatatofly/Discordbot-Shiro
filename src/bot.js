const Commando = require('discord.js-commando');
const config = require("./config.json");

const client = new Commando.Client({
    owner: config.botOwnerID,
    commandPrefix: config.prefix,
    disableEveryone: true,
    unknownCommandResponse: false
});

// Command group registries
client.registry.registerGroup('fun', 'Fun');
client.registry.registerGroup('twitter', 'Twitter');
client.registry.registerGroup('status', 'Status');
client.registry.registerGroup('saa', 'Sää');
client.registry.registerGroup('ownertools', 'Owner Tools');

// Registries etc.
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + "/BotModules");

// Sets the Playing text when the client is ready
client.on("ready", () => {
    client.user.setActivity(config.botActivity)
    console.log(`Client is ready: ${client.user.username}`);
});

// Login and connecting to Discord servers
client.login(config.token);
