const Discord = require('discord.js');
const fs = require('fs');

const config = require("./config.json");


const intents = new Discord.Intents();
intents.add(
  Discord.Intents.FLAGS.GUILDS, 
  Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.DIRECT_MESSAGES
);

const client = new Discord.Client({ intents: intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'], restGlobalRateLimit: 50, restRequestTimeout: 30000, retryLimit: 2 });

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.activity);
});

client.on('messageCreate', message => {
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));
    if (!command) return;
    message.channel.sendTyping();
    
    if (command.ownerOnly && message.author.id !== config.botOwnerID) {
        return message.channel.send(`\`${config.prefix}${commandName}\` is only for bot owner`);
    }

    if (command.guildOnly && message.channel.type === 'DM') {
        return message.channel.send(`I can't execute \`${config.prefix}${commandName}\` inside DMs`);
    }

    if (command.nsfw && !message.channel.nsfw) {
        return message.channel.send(`\`${config.prefix}${commandName}\` is Not Safe For Work`);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Wait ${timeLeft.toFixed(1)} seconds before using \`${config.prefix}${commandName}\` again`);
        }
    }

    try {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error with that command');
    }
});

client.login(config.token);