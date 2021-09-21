const { suggestChannelID } = require("../config.json")

module.exports = {
	name: 'suggest',
  cooldown: 120,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Saves suggested feature for bot owner',
	execute(message, args, client) {
    if (!args.length || args.length < 1) return message.channel.send("You didn't suggest anything...")
    try {
      client.channels.fetch(suggestChannelID)
        .then(channel => channel.send(args.join(" ")));
      message.channel.send("Thanks :smiley:")
    } catch(error) {
      console.log(error)
    }
	}
}