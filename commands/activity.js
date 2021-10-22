const config = require("../config.json");

async function setActivity(message, args, user) {
  if (!args.length) return user.setActivity(config.activity);
  try {
    user.setActivity(args.join(" "));
    console.log(`Activity: ${args.join(" ")}`);
  } catch (error) {
    console.log(error)
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