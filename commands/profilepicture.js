const config = require("../config.json");

async function setPicture(message, args, user) {
  if (!args.length) return user.setAvatar(config.profilePicURL);
  try {
    user.setAvatar(args[0]);
    console.log(`New profile pic: ${args[0]}`);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  name: 'profilepicture',
  aliases: ['profpic'],
  cooldown: 5,
  guildOnly: false,
  ownerOnly: true,
  nsfw: false,
	description: 'Sets bot profile picture',
	execute(message, args, client) {
		setPicture(message, args, client.user)
	}
}