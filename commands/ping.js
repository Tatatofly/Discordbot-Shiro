module.exports = {
	name: 'ping',
	cooldown: 10,
	guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Ping -> Pong',
	execute(message, args) {
		try {
			message.channel.send('pong')
		} catch (error) {
			console.log(error)
		}
	}
}