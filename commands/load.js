module.exports = {
  name: 'load',
  cooldown: 5,
	guildOnly: false,
  ownerOnly: true,
  nsfw: false,
	description: 'Loads a command',
	execute(message, args) {
    if (!args.length) return message.channel.send(`You didn't pass any command to load`)
		const commandName = args[0].toLowerCase();
    try {
      const newCommand = require(`./${commandName}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.log(error);
      message.channel.send(`There was an error while loading a command \`${commandName}\`:\n\`${error.message}\``);
    }
    message.channel.send(`Command \`${commandName}\` loaded`)
	}
}