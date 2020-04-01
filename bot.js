const Discord = require('discord.js')
const fs = require('fs')

const config = require("./config.json")

const client = new Discord.Client()

client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`${config.prefix}help | discord.gg/mE7PsTy`)
})

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return
    
    const args = message.content.slice(config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    // Do we have the command or not
    if (!client.commands.has(command)) return

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }
    

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (client.commands.get(command).cooldown || 5) * 1000
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.channel.send(`Wait ${timeLeft.toFixed(1)} seconds before reusing the \`${command}\` command`)
        }
    }

    try {
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        client.commands.get(command).execute(message, args)
    } catch (error) {
        console.error(error)
        message.channel.send('There was an error with that command')
    }
})

client.login(config.token)