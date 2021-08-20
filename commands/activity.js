const config = require("../config.json");

async function setActivity(message, args, user) {
  if (!args.length) return user.setActivity(config.activity);
  try {
    user.setActivity(args[0]);
    console.log(`Activity: ${args[0]}`);
  } catch (error) {
    console.log(error)
    message.channel.send(`There was an error while setting activity: ${error.message}`)
  }
}

module.exports = {
  name: 'activity',
  aliases: ['act'],
  cooldown: 5,
  guildOnly: false,
  ownerOnly: true,
  nsfw: false,
	description: 'Sets bot Activity',
	execute(message, args, client) {
		setActivity(message, args, client.user)
	}
}